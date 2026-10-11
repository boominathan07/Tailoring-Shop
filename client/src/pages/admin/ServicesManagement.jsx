import { useState, useEffect, useRef } from 'react';
import apiClient from '../../api/client';
import Pagination from '../../components/common/Pagination';
import Modal from '../../components/common/Modal';
import Toast from '../../components/common/Toast';

const ServicesManagement = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  
  // Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Blouse',
    pricingType: 'starting_price',
    startingPrice: '',
    includedItems: '',
    customizationAvailable: false,
    customizationDetails: '',
    status: 'Published'
  });
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  
  // Feedback & Delete state
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const abortControllerRef = useRef(null);

  const fetchServices = async (background = false) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    if (!background) setLoading(true);
    try {
      const query = new URLSearchParams({ page, limit: 10 }).toString();
      const response = await apiClient.get(`/services?${query}`, {
        signal: controller.signal
      });
      if (response.data.success) {
        const d = response.data.data;
        setServices(d.services || d);
        if (d.totalPages) setTotalPages(d.totalPages);
        if (d.total !== undefined) setTotalCount(d.total);
      }
    } catch (err) {
      if (err.name === 'CanceledError' || err.message === 'canceled' || err.code === 'ERR_CANCELED') {
        return; // Ignore intentional abort
      }
      setToast({ message: 'Failed to load services.', type: 'error' });
      console.error(err);
    } finally {
      if (abortControllerRef.current === controller) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchServices();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [page]);

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: 'Blouse',
      pricingType: 'starting_price',
      startingPrice: '',
      includedItems: '',
      customizationAvailable: false,
      customizationDetails: '',
      status: 'Published'
    });
    setImageFile(null);
    setEditingId(null);
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (service) => {
    setFormData({
      name: service.name,
      description: service.description || '',
      category: service.category,
      pricingType: service.pricingType,
      startingPrice: service.startingPrice || '',
      includedItems: service.includedItems ? service.includedItems.join(', ') : '',
      customizationAvailable: service.customizationAvailable || false,
      customizationDetails: service.customizationDetails || '',
      status: service.status
    });
    setImageFile(null);
    setEditingId(service._id);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('pricingType', formData.pricingType);
    if (formData.pricingType === 'starting_price') {
      data.append('startingPrice', formData.startingPrice);
    }
    data.append('includedItems', formData.includedItems);
    data.append('customizationAvailable', formData.customizationAvailable);
    data.append('customizationDetails', formData.customizationDetails);
    data.append('status', formData.status);
    
    if (imageFile) {
      data.append('image', imageFile);
    }

    try {
      if (editingId) {
        const response = await apiClient.put(`/services/${editingId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setServices(prev => prev.map(s => s._id === editingId ? response.data.data : s));
      } else {
        await apiClient.post('/services', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        await fetchServices(true);
      }
      setToast({ message: 'Service saved successfully.', type: 'success' });
      resetForm();
    } catch (err) {
      setToast({ message: err.response?.data?.message || 'Failed to save service.', type: 'error' });
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = (service) => {
    setServiceToDelete(service);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!serviceToDelete) return;
    setDeleting(true);
    try {
      await apiClient.delete(`/services/${serviceToDelete._id}`);
      if (services.length === 1 && page > 1) {
        setPage(p => p - 1);
        } else {
          await fetchServices();
        }
        setToast({ message: 'Service deleted successfully.', type: 'success' });
        setDeleteModalOpen(false);
        setServiceToDelete(null);
      } catch (err) {
        setToast({ message: 'Failed to delete service. Please try again.', type: 'error' });
        console.error(err);
      } finally {
        setDeleting(false);
      }
    };
  
    const [togglingId, setTogglingId] = useState(null);

    const handleTogglePublish = async (service) => {
      if (togglingId) return;
      setTogglingId(service._id);
      try {
        const data = new FormData();
        const newStatus = service.status === 'Published' ? 'Draft' : 'Published';
        data.append('status', newStatus);
        const response = await apiClient.put(`/services/${service._id}`, data);
        setServices(prev => prev.map(s => s._id === service._id ? response.data.data : s));
        setToast({ message: `Service ${newStatus === 'Published' ? 'published' : 'hidden'} successfully.`, type: 'success' });
      } catch (err) {
        setToast({ message: 'Failed to update status.', type: 'error' });
      } finally {
        setTogglingId(null);
      }
    };

  return (
    <div className="flex flex-col w-full">
      {/* HEADER SECTION */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
        <div className="flex flex-col">
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-normal tracking-tight">Services Management</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage tailoring services visible to clients.</p>
        </div>
        <div className="flex items-center">
          <button 
            onClick={openAddModal}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-primary text-on-primary font-label-md text-label-md rounded hover:bg-primary-container transition-colors shadow-sm cursor-pointer" 
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Add New Service
          </button>
        </div>
      </section>

      {/* TABLE SECTION */}
      <section className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 overflow-hidden flex flex-col">
        <div className="w-full">
          <table className="w-full text-left font-body-sm text-body-sm block md:table">
            <thead className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider border-b border-outline-variant/30 hidden md:table-header-group">
              <tr>
                <th className="py-3 px-space-md font-semibold" scope="col">Service Preview</th>
                <th className="py-3 px-space-sm font-semibold" scope="col">Category</th>
                <th className="py-3 px-space-sm font-semibold" scope="col">Price</th>
                <th className="py-3 px-space-sm font-semibold text-center" scope="col">Status</th>
                <th className="py-3 px-space-md text-right font-semibold" scope="col">Actions</th>
              </tr>
            </thead>
            <tbody className="text-on-surface divide-y md:divide-y md:divide-outline-variant/20 block md:table-row-group">
              {loading ? (
                <tr><td colSpan="5" className="py-10 text-center text-on-surface-variant">Loading services...</td></tr>
              ) : services.length === 0 ? (
                <tr><td colSpan="5" className="py-10 text-center text-on-surface-variant">No services found.</td></tr>
              ) : (
                services.map((service) => (
                  <tr key={service._id} className="hover:bg-surface-container-low/50 transition-colors flex flex-col md:table-row p-4 md:p-0 border-b border-outline-variant/20 md:border-none gap-2 md:gap-0">
                    <td className="py-2 md:py-3 px-0 md:px-space-md flex md:table-cell items-center w-full">
                      <div className="flex items-center gap-3 min-w-0">
                        {service.image?.url ? (
                          <img src={service.image.url} alt={service.name} className="w-12 h-12 rounded object-cover flex-shrink-0 shadow-xs border border-outline-variant/20" />
                        ) : (
                          <div className="w-12 h-12 rounded bg-surface-container flex items-center justify-center flex-shrink-0 text-outline">
                            <span className="material-symbols-outlined text-[20px]">image</span>
                          </div>
                        )}
                        <div className="flex flex-col min-w-0">
                          <span className="font-medium text-on-surface truncate">{service.name}</span>
                          <span className="font-label-sm text-[11px] text-on-surface-variant truncate max-w-full sm:max-w-xs md:max-w-48 lg:max-w-xs">{service.description}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 md:py-3 px-0 md:px-space-sm flex justify-between md:table-cell items-center w-full border-t border-outline-variant/10 md:border-none pt-3 md:pt-3">
                      <span className="md:hidden font-label-sm text-on-surface-variant uppercase text-[10px] tracking-wider">Category</span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-surface-container text-on-surface-variant">
                        {service.category}
                      </span>
                    </td>
                    <td className="py-2 md:py-3 px-0 md:px-space-sm flex justify-between md:table-cell items-center w-full border-t border-outline-variant/10 md:border-none pt-3 md:pt-3">
                      <span className="md:hidden font-label-sm text-on-surface-variant uppercase text-[10px] tracking-wider">Price</span>
                      <span className="text-on-surface-variant">
                        {service.pricingType === 'enquiry' ? 'On Consultation' : `₹${service.startingPrice}`}
                      </span>
                    </td>
                    <td className="py-2 md:py-3 px-0 md:px-space-sm flex justify-between md:table-cell items-center text-center w-full border-t border-outline-variant/10 md:border-none pt-3 md:pt-3">
                      <span className="md:hidden font-label-sm text-on-surface-variant uppercase text-[10px] tracking-wider">Status</span>
                      <button
                        disabled={togglingId === service._id}
                        onClick={() => handleTogglePublish(service)}
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium transition-colors disabled:opacity-50 ${
                          service.status === 'Published'
                            ? 'bg-primary-fixed text-on-primary-fixed hover:bg-primary-fixed-dim' 
                            : 'bg-error-container text-on-error-container hover:bg-error-container/80'
                        }`}
                      >
                        {togglingId === service._id ? 'Updating...' : service.status}
                      </button>
                    </td>
                    <td className="py-3 px-0 md:px-space-md md:text-right flex justify-end md:table-cell items-center w-full border-t border-outline-variant/10 md:border-none pt-4 md:pt-3">
                      <div className="flex items-center justify-end gap-2 w-full md:w-auto">
                        <button 
                          onClick={() => openEditModal(service)}
                          className="p-1.5 rounded text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button 
                          onClick={() => confirmDelete(service)}
                          className="p-1.5 rounded text-on-surface-variant hover:text-error hover:bg-error/10 transition-colors"
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Pagination page={page} totalPages={totalPages} setPage={setPage} disabled={loading} />
      </section>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-2xl bg-surface rounded-lg border border-outline-variant shadow-xl flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-outline-variant/40 flex items-center justify-between bg-surface-container-low rounded-t-lg">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">{editingId ? 'Edit Service' : 'Add New Service'}</h2>
              <button onClick={resetForm} className="w-9 h-9 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 col-span-1 md:col-span-2">
                  <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-medium">Name *</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="h-11 px-3.5 rounded bg-surface border border-outline-variant text-on-surface focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                
                <div className="flex flex-col gap-1.5 col-span-1 md:col-span-2">
                  <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-medium">Description</label>
                  <textarea 
                    rows="3"
                    value={formData.description} 
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="p-3 rounded bg-surface border border-outline-variant text-on-surface focus:border-primary focus:ring-1 focus:ring-primary resize-y"
                  ></textarea>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-medium">Category *</label>
                  <select 
                    value={formData.category} 
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="h-11 px-3.5 rounded bg-surface border border-outline-variant text-on-surface focus:border-primary focus:ring-1 focus:ring-primary appearance-none"
                  >
                    <option>Blouse</option>
                    <option>Dress</option>
                    <option>Bridal</option>
                    <option>Alteration</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-medium">Pricing Type *</label>
                  <select 
                    value={formData.pricingType} 
                    onChange={e => setFormData({...formData, pricingType: e.target.value})}
                    className="h-11 px-3.5 rounded bg-surface border border-outline-variant text-on-surface focus:border-primary focus:ring-1 focus:ring-primary appearance-none"
                  >
                    <option value="starting_price">Starting Price</option>
                    <option value="enquiry">Enquiry Only</option>
                  </select>
                </div>

                {formData.pricingType === 'starting_price' && (
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-medium">Starting Price (₹) *</label>
                    <input 
                      type="number"
                      min="0"
                      required
                      value={formData.startingPrice} 
                      onChange={e => setFormData({...formData, startingPrice: e.target.value})}
                      className="h-11 px-3.5 rounded bg-surface border border-outline-variant text-on-surface focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-1.5 col-span-1 md:col-span-2">
                  <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-medium">Included Items (comma separated)</label>
                  <input 
                    type="text" 
                    value={formData.includedItems} 
                    onChange={e => setFormData({...formData, includedItems: e.target.value})}
                    className="h-11 px-3.5 rounded bg-surface border border-outline-variant text-on-surface focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="E.g., Measurement, Padding, Fitting Trial"
                  />
                </div>

                <div className="flex flex-col gap-1.5 col-span-1 md:col-span-2">
                  <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-medium">Customization Details</label>
                  <textarea 
                    rows="2"
                    value={formData.customizationDetails} 
                    onChange={e => setFormData({...formData, customizationDetails: e.target.value})}
                    className="p-3 rounded bg-surface border border-outline-variant text-on-surface focus:border-primary focus:ring-1 focus:ring-primary resize-y"
                  ></textarea>
                </div>
                
                <div className="flex items-center gap-2 col-span-1 md:col-span-2 py-1">
                  <input 
                    type="checkbox" 
                    id="customizationAvailable"
                    checked={formData.customizationAvailable}
                    onChange={e => setFormData({...formData, customizationAvailable: e.target.checked})}
                    className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary"
                  />
                  <label htmlFor="customizationAvailable" className="font-body-md text-on-surface">Customization Available</label>
                </div>

                <div className="flex flex-col gap-1.5 col-span-1 md:col-span-2">
                  <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-medium">
                    Upload Image {editingId ? '(Leave empty to keep existing)' : ''}
                  </label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={e => setImageFile(e.target.files[0])}
                    className="h-11 p-2 rounded bg-surface border border-dashed border-outline-variant text-on-surface"
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-medium">Status *</label>
                  <select 
                    value={formData.status} 
                    onChange={e => setFormData({...formData, status: e.target.value})}
                    className="h-11 px-3.5 rounded bg-surface border border-outline-variant text-on-surface focus:border-primary focus:ring-1 focus:ring-primary appearance-none"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>
              
              <div className="pt-4 mt-2 border-t border-outline-variant/40 flex items-center justify-end gap-3">
                <button 
                  type="button" 
                  onClick={resetForm}
                  className="px-5 h-11 rounded font-label-md font-medium text-on-surface-variant hover:bg-surface-container transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={submitting}
                  className="px-5 h-11 rounded bg-primary text-on-primary font-label-md font-semibold shadow-sm hover:bg-primary-container transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {submitting ? 'Saving...' : 'Save Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* DELETE MODAL */}
      <Modal 
        isOpen={deleteModalOpen} 
        onClose={() => !deleting && setDeleteModalOpen(false)}
        title="Delete Service"
      >
        <div className="flex flex-col gap-6">
          <p className="text-on-surface-variant font-body-md">
            This action will permanently remove the service <span className="font-semibold text-on-surface">"{serviceToDelete?.name}"</span>. 
            This cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setDeleteModalOpen(false)}
              disabled={deleting}
              className="px-5 h-10 rounded font-label-md font-medium text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="px-5 h-10 rounded bg-error text-on-error font-label-md font-semibold shadow-sm hover:bg-error/90 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {deleting ? 'Deleting...' : 'Delete Service'}
            </button>
          </div>
        </div>
      </Modal>

      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ message: '', type: 'success' })} 
      />
    </div>
  );
};

export default ServicesManagement;
