import { useState, useEffect, useRef } from 'react';
import apiClient from '../../api/client';
import Pagination from '../../components/common/Pagination';
import Modal from '../../components/common/Modal';
import Toast from '../../components/common/Toast';

const DesignsManagement = () => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  
  // Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [designToDelete, setDesignToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Bridal',
    metadata: { fabric: '', neckline: '', sleeveType: '' },
    isPublished: true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const abortControllerRef = useRef(null);

  const fetchDesigns = async (background = false) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    if (!background) setLoading(true);
    try {
      const query = new URLSearchParams({ page, limit: 10 }).toString();
      const response = await apiClient.get(`/designs?${query}`, {
        signal: controller.signal
      });
      if (response.data.success) {
        const d = response.data.data;
        setDesigns(d.designs || d);
        if (d.totalPages) setTotalPages(d.totalPages);
        if (d.total !== undefined) setTotalCount(d.total);
      }
    } catch (err) {
      if (err.name === 'CanceledError' || err.message === 'canceled' || err.code === 'ERR_CANCELED') {
        return; // Ignore intentional abort
      }
      setToast({ message: 'Failed to load designs.', type: 'error' });
      console.error(err);
    } finally {
      if (abortControllerRef.current === controller) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchDesigns();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [page]);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'Bridal',
      metadata: { fabric: '', neckline: '', sleeveType: '' },
      isPublished: true,
    });
    setImageFile(null);
    setEditingId(null);
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (design) => {
    setFormData({
      title: design.title,
      description: design.description,
      category: design.category,
      metadata: {
        fabric: design.metadata?.fabric || '',
        neckline: design.metadata?.neckline || '',
        sleeveType: design.metadata?.sleeveType || ''
      },
      isPublished: design.isPublished,
    });
    setImageFile(null);
    setEditingId(design._id);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('metadata', JSON.stringify(formData.metadata));
    data.append('isPublished', formData.isPublished);
    if (imageFile) {
      data.append('images', imageFile);
    }

    try {
      if (editingId) {
        const response = await apiClient.put(`/designs/${editingId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setDesigns(prev => prev.map(d => d._id === editingId ? response.data.data : d));
      } else {
        await apiClient.post('/designs', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        await fetchDesigns(true);
      }
      setToast({ message: 'Design saved successfully.', type: 'success' });
      resetForm();
    } catch (err) {
      setToast({ message: err.response?.data?.message || 'Failed to save design.', type: 'error' });
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = (design) => {
    setDesignToDelete(design);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!designToDelete) return;
    setDeleting(true);
    try {
      await apiClient.delete(`/designs/${designToDelete._id}`);
      setToast({ message: 'Design deleted successfully.', type: 'success' });
      
      if (designs.length === 1 && page > 1) {
        setPage(p => p - 1);
      } else {
        await fetchDesigns();
      }
    } catch (err) {
      setToast({ message: 'Failed to delete design.', type: 'error' });
      console.error(err);
    } finally {
      setDeleting(false);
      setDeleteModalOpen(false);
      setDesignToDelete(null);
    }
  };

  const [togglingId, setTogglingId] = useState(null);

  const handleTogglePublish = async (design) => {
    if (togglingId) return;
    setTogglingId(design._id);
    try {
      const data = new FormData();
      data.append('isPublished', !design.isPublished);
      const response = await apiClient.put(`/designs/${design._id}`, data);
      setDesigns(prev => prev.map(d => d._id === design._id ? response.data.data : d));
      setToast({ message: 'Design status updated.', type: 'success' });
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
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-normal tracking-tight">Designs Management</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage the portfolio of handcrafted designs visible to clients.</p>
        </div>
        <div className="flex items-center">
          <button 
            onClick={openAddModal}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-primary text-on-primary font-label-md text-label-md rounded hover:bg-primary-container transition-colors shadow-sm cursor-pointer" 
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Add New Design
          </button>
        </div>
      </section>

      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ message: '', type: 'success' })} 
      />

      {/* TABLE SECTION */}
      <section className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 overflow-hidden flex flex-col">
        <div className="w-full">
          <table className="w-full text-left font-body-sm text-body-sm block md:table">
            <thead className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider border-b border-outline-variant/30 hidden md:table-header-group">
              <tr>
                <th className="py-3 px-space-md font-semibold" scope="col">Design Preview</th>
                <th className="py-3 px-space-sm font-semibold" scope="col">Category</th>
                <th className="py-3 px-space-sm font-semibold" scope="col">Fabric</th>
                <th className="py-3 px-space-sm font-semibold text-center" scope="col">Status</th>
                <th className="py-3 px-space-md text-right font-semibold" scope="col">Actions</th>
              </tr>
            </thead>
            <tbody className="text-on-surface divide-y md:divide-y md:divide-outline-variant/20 block md:table-row-group">
              {loading ? (
                <tr><td colSpan="5" className="py-10 text-center text-on-surface-variant">Loading designs...</td></tr>
              ) : designs.length === 0 ? (
                <tr><td colSpan="5" className="py-10 text-center text-on-surface-variant">No designs found.</td></tr>
              ) : (
                designs.map((design) => (
                  <tr key={design._id} className="hover:bg-surface-container-low/50 transition-colors flex flex-col md:table-row p-4 md:p-0 border-b border-outline-variant/20 md:border-none gap-2 md:gap-0">
                    <td className="py-2 md:py-3 px-0 md:px-space-md flex md:table-cell items-center w-full">
                      <div className="flex items-center gap-3 min-w-0">
                        {design.images && design.images[0] ? (
                          <img src={design.images[0].url} alt={design.title} className="w-12 h-12 rounded object-cover flex-shrink-0 shadow-xs border border-outline-variant/20" />
                        ) : (
                          <div className="w-12 h-12 rounded bg-surface-container flex items-center justify-center flex-shrink-0 text-outline">
                            <span className="material-symbols-outlined text-[20px]">image</span>
                          </div>
                        )}
                        <div className="flex flex-col min-w-0">
                          <span className="font-medium text-on-surface truncate">{design.title}</span>
                          <span className="font-label-sm text-[11px] text-on-surface-variant truncate max-w-full sm:max-w-xs md:max-w-48 lg:max-w-xs">{design.description}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 md:py-3 px-0 md:px-space-sm flex justify-between md:table-cell items-center w-full border-t border-outline-variant/10 md:border-none pt-3 md:pt-3">
                      <span className="md:hidden font-label-sm text-on-surface-variant uppercase text-[10px] tracking-wider">Category</span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-surface-container text-on-surface-variant">
                        {design.category}
                      </span>
                    </td>
                    <td className="py-2 md:py-3 px-0 md:px-space-sm flex justify-between md:table-cell items-center w-full border-t border-outline-variant/10 md:border-none pt-3 md:pt-3">
                      <span className="md:hidden font-label-sm text-on-surface-variant uppercase text-[10px] tracking-wider">Fabric</span>
                      <span className="text-on-surface-variant">{design.metadata?.fabric || 'N/A'}</span>
                    </td>
                    <td className="py-2 md:py-3 px-0 md:px-space-sm flex justify-between md:table-cell items-center text-center w-full border-t border-outline-variant/10 md:border-none pt-3 md:pt-3">
                      <span className="md:hidden font-label-sm text-on-surface-variant uppercase text-[10px] tracking-wider">Status</span>
                      <button
                        disabled={togglingId === design._id}
                        onClick={() => handleTogglePublish(design)}
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium transition-colors disabled:opacity-50 ${
                          design.isPublished 
                            ? 'bg-primary-fixed text-on-primary-fixed hover:bg-primary-fixed-dim' 
                            : 'bg-error-container text-on-error-container hover:bg-error-container/80'
                        }`}
                      >
                        {togglingId === design._id ? 'Updating...' : (design.isPublished ? 'Published' : 'Hidden')}
                      </button>
                    </td>
                    <td className="py-3 px-0 md:px-space-md md:text-right flex justify-end md:table-cell items-center w-full border-t border-outline-variant/10 md:border-none pt-4 md:pt-3">
                      <div className="flex items-center justify-end gap-2 w-full md:w-auto">
                        <button 
                          onClick={() => openEditModal(design)}
                          className="p-1.5 rounded text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button 
                          onClick={() => confirmDelete(design)}
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

      {/* DELETE MODAL */}
      <Modal 
        isOpen={deleteModalOpen} 
        onClose={() => !deleting && setDeleteModalOpen(false)}
        title="Delete Design"
      >
        <div className="flex flex-col gap-6">
          <p className="text-on-surface-variant font-body-md">
            Are you sure you want to permanently delete the design <strong>{designToDelete?.title}</strong>? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setDeleteModalOpen(false)}
              disabled={deleting}
              className="px-4 py-2 rounded-md font-label-md text-on-surface hover:bg-surface-container transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="px-4 py-2 rounded-md font-label-md bg-error text-on-error hover:bg-error/90 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {deleting && <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>}
              Delete Design
            </button>
          </div>
        </div>
      </Modal>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-2xl bg-surface rounded-lg border border-outline-variant shadow-xl flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-outline-variant/40 flex items-center justify-between bg-surface-container-low rounded-t-lg">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">{editingId ? 'Edit Design' : 'Add New Design'}</h2>
              <button onClick={resetForm} className="w-9 h-9 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 col-span-1 md:col-span-2">
                  <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-medium">Title *</label>
                  <input 
                    required
                    type="text" 
                    value={formData.title} 
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="h-11 px-3.5 rounded bg-surface border border-outline-variant text-on-surface focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                
                <div className="flex flex-col gap-1.5 col-span-1 md:col-span-2">
                  <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-medium">Description *</label>
                  <textarea 
                    required
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
                    <option>Bridal</option>
                    <option>Party Wear</option>
                    <option>Casual</option>
                    <option>Formal</option>
                    <option>Indo-Western</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-medium">Fabric</label>
                  <input 
                    type="text" 
                    value={formData.metadata.fabric} 
                    onChange={e => setFormData({...formData, metadata: {...formData.metadata, fabric: e.target.value}})}
                    className="h-11 px-3.5 rounded bg-surface border border-outline-variant text-on-surface focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-medium">Neckline</label>
                  <input 
                    type="text" 
                    value={formData.metadata.neckline} 
                    onChange={e => setFormData({...formData, metadata: {...formData.metadata, neckline: e.target.value}})}
                    className="h-11 px-3.5 rounded bg-surface border border-outline-variant text-on-surface focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-medium">Sleeve Type</label>
                  <input 
                    type="text" 
                    value={formData.metadata.sleeveType} 
                    onChange={e => setFormData({...formData, metadata: {...formData.metadata, sleeveType: e.target.value}})}
                    className="h-11 px-3.5 rounded bg-surface border border-outline-variant text-on-surface focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="flex flex-col gap-1.5 col-span-1 md:col-span-2">
                  <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-medium">
                    Upload Image {editingId ? '(Leave empty to keep existing)' : '*'}
                  </label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={e => setImageFile(e.target.files[0])}
                    className="h-11 p-2 rounded bg-surface border border-dashed border-outline-variant text-on-surface"
                    required={!editingId}
                  />
                </div>
                
                <div className="flex items-center gap-2 col-span-1 md:col-span-2 py-2">
                  <input 
                    type="checkbox" 
                    id="isPublished"
                    checked={formData.isPublished}
                    onChange={e => setFormData({...formData, isPublished: e.target.checked})}
                    className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary"
                  />
                  <label htmlFor="isPublished" className="font-body-md text-on-surface">Publish Immediately</label>
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
                  {submitting ? 'Saving...' : 'Save Design'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignsManagement;
