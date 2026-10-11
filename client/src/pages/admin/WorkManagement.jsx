import { useState, useEffect, useRef } from 'react';
import apiClient from '../../api/client';
import Pagination from '../../components/common/Pagination';
import Modal from '../../components/common/Modal';
import Toast from '../../components/common/Toast';

const WorkManagement = () => {
  const [works, setWorks] = useState([]);
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
    title: '',
    description: '',
    category: 'Blouses',
    referenceNumber: '',
    metadata: { fabric: '', timeSpent: '', specialDetail: '' },
    isPublished: true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Feedback & Delete state
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [workToDelete, setWorkToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const abortControllerRef = useRef(null);

  const fetchWorks = async (background = false) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    if (!background) setLoading(true);
    try {
      const query = new URLSearchParams({ page, limit: 10 }).toString();
      const response = await apiClient.get(`/works?${query}`, {
        signal: controller.signal
      });
      if (response.data.success) {
        const d = response.data.data;
        setWorks(d.works || d);
        if (d.totalPages) setTotalPages(d.totalPages);
        if (d.total !== undefined) setTotalCount(d.total);
      }
    } catch (err) {
      if (err.name === 'CanceledError' || err.message === 'canceled' || err.code === 'ERR_CANCELED') {
        return; // Ignore intentional abort
      }
      setToast({ message: 'Failed to load portfolio works.', type: 'error' });
      console.error(err);
    } finally {
      if (abortControllerRef.current === controller) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchWorks();
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
      category: 'Blouses',
      referenceNumber: '',
      metadata: { fabric: '', timeSpent: '', specialDetail: '' },
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

  const openEditModal = (work) => {
    setFormData({
      title: work.title,
      description: work.description,
      category: work.category,
      referenceNumber: work.referenceNumber || '',
      metadata: {
        fabric: work.metadata?.fabric || '',
        timeSpent: work.metadata?.timeSpent || '',
        specialDetail: work.metadata?.specialDetail || ''
      },
      isPublished: work.isPublished,
    });
    setImageFile(null);
    setEditingId(work._id);
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
    data.append('referenceNumber', formData.referenceNumber);
    data.append('metadata', JSON.stringify(formData.metadata));
    data.append('isPublished', formData.isPublished);
    if (imageFile) {
      data.append('image', imageFile);
    }

    try {
      if (editingId) {
        const response = await apiClient.put(`/works/${editingId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setWorks(prev => prev.map(w => w._id === editingId ? response.data.data : w));
      } else {
        await apiClient.post('/works', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        await fetchWorks(true);
      }
      setToast({ message: 'Work saved successfully.', type: 'success' });
      resetForm();
    } catch (err) {
      setToast({ message: err.response?.data?.message || 'Failed to save portfolio work.', type: 'error' });
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = (work) => {
    setWorkToDelete(work);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!workToDelete) return;
    setDeleting(true);
    try {
      await apiClient.delete(`/works/${workToDelete._id}`);
      if (works.length === 1 && page > 1) {
        setPage(p => p - 1);
      } else {
        await fetchWorks();
      }
      setToast({ message: 'Portfolio work deleted successfully.', type: 'success' });
      setDeleteModalOpen(false);
      setWorkToDelete(null);
    } catch (err) {
      setToast({ message: 'Failed to delete work. Please try again.', type: 'error' });
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  const [togglingId, setTogglingId] = useState(null);

  const handleTogglePublish = async (work) => {
    if (togglingId) return;
    setTogglingId(work._id);
    try {
      const data = new FormData();
      data.append('isPublished', !work.isPublished);
      const response = await apiClient.put(`/works/${work._id}`, data);
      setWorks(prev => prev.map(w => w._id === work._id ? response.data.data : w));
      setToast({ message: `Work ${work.isPublished ? 'hidden' : 'published'} successfully.`, type: 'success' });
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
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-normal tracking-tight">Portfolio & Archive</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage completed handcrafted garments visible on the Our Work page.</p>
        </div>
        <div className="flex items-center">
          <button 
            onClick={openAddModal}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-primary text-on-primary font-label-md text-label-md rounded hover:bg-primary-container transition-colors shadow-sm cursor-pointer" 
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Add Portfolio Item
          </button>
        </div>
      </section>

      {/* TABLE SECTION */}
      <section className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 overflow-hidden flex flex-col">
        <div className="w-full">
          <table className="w-full text-left font-body-sm text-body-sm block md:table">
            <thead className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider border-b border-outline-variant/30 hidden md:table-header-group">
              <tr>
                <th className="py-3 px-space-md font-semibold" scope="col">Portfolio Preview</th>
                <th className="py-3 px-space-sm font-semibold" scope="col">Category</th>
                <th className="py-3 px-space-sm font-semibold" scope="col">Ref #</th>
                <th className="py-3 px-space-sm font-semibold text-center" scope="col">Status</th>
                <th className="py-3 px-space-md text-right font-semibold" scope="col">Actions</th>
              </tr>
            </thead>
            <tbody className="text-on-surface divide-y md:divide-y md:divide-outline-variant/20 block md:table-row-group">
              {loading ? (
                <tr><td colSpan="5" className="py-10 text-center text-on-surface-variant">Loading portfolio works...</td></tr>
              ) : works.length === 0 ? (
                <tr><td colSpan="5" className="py-10 text-center text-on-surface-variant">No works found.</td></tr>
              ) : (
                works.map((work) => (
                  <tr key={work._id} className="hover:bg-surface-container-low/50 transition-colors flex flex-col md:table-row p-4 md:p-0 border-b border-outline-variant/20 md:border-none gap-2 md:gap-0">
                    <td className="py-2 md:py-3 px-0 md:px-space-md flex md:table-cell items-center w-full">
                      <div className="flex items-center gap-3 min-w-0">
                        {work.images && work.images[0] ? (
                          <img src={work.images[0].url} alt={work.title} className="w-12 h-12 rounded object-cover flex-shrink-0 shadow-xs border border-outline-variant/20" />
                        ) : (
                          <div className="w-12 h-12 rounded bg-surface-container flex items-center justify-center flex-shrink-0 text-outline">
                            <span className="material-symbols-outlined text-[20px]">image</span>
                          </div>
                        )}
                        <div className="flex flex-col min-w-0">
                          <span className="font-medium text-on-surface truncate">{work.title}</span>
                          <span className="font-label-sm text-[11px] text-on-surface-variant truncate max-w-full sm:max-w-xs md:max-w-48 lg:max-w-xs">{work.description}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 md:py-3 px-0 md:px-space-sm flex justify-between md:table-cell items-center w-full border-t border-outline-variant/10 md:border-none pt-3 md:pt-3">
                      <span className="md:hidden font-label-sm text-on-surface-variant uppercase text-[10px] tracking-wider">Category</span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-surface-container text-on-surface-variant">
                        {work.category}
                      </span>
                    </td>
                    <td className="py-2 md:py-3 px-0 md:px-space-sm flex justify-between md:table-cell items-center w-full border-t border-outline-variant/10 md:border-none pt-3 md:pt-3">
                      <span className="md:hidden font-label-sm text-on-surface-variant uppercase text-[10px] tracking-wider">Ref #</span>
                      <span className="text-on-surface-variant">{work.referenceNumber || 'N/A'}</span>
                    </td>
                    <td className="py-2 md:py-3 px-0 md:px-space-sm flex justify-between md:table-cell items-center text-center w-full border-t border-outline-variant/10 md:border-none pt-3 md:pt-3">
                      <span className="md:hidden font-label-sm text-on-surface-variant uppercase text-[10px] tracking-wider">Status</span>
                      <button
                        disabled={togglingId === work._id}
                        onClick={() => handleTogglePublish(work)}
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium transition-colors disabled:opacity-50 ${
                          work.isPublished 
                            ? 'bg-primary-fixed text-on-primary-fixed hover:bg-primary-fixed-dim' 
                            : 'bg-error-container text-on-error-container hover:bg-error-container/80'
                        }`}
                      >
                        {togglingId === work._id ? 'Updating...' : (work.isPublished ? 'Published' : 'Hidden')}
                      </button>
                    </td>
                    <td className="py-3 px-0 md:px-space-md md:text-right flex justify-end md:table-cell items-center w-full border-t border-outline-variant/10 md:border-none pt-4 md:pt-3">
                      <div className="flex items-center justify-end gap-2 w-full md:w-auto">
                        <button 
                          onClick={() => openEditModal(work)}
                          className="p-1.5 rounded text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button 
                          onClick={() => confirmDelete(work)}
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
              <h2 className="font-headline-sm text-headline-sm text-on-surface">{editingId ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}</h2>
              <button onClick={resetForm} className="w-9 h-9 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 md:col-span-1">
                  <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-medium">Title *</label>
                  <input 
                    required
                    type="text" 
                    value={formData.title} 
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="h-11 px-3.5 rounded bg-surface border border-outline-variant text-on-surface focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                
                <div className="flex flex-col gap-1.5 md:col-span-1">
                  <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-medium">Reference Number</label>
                  <input 
                    type="text" 
                    placeholder="e.g. GT-408"
                    value={formData.referenceNumber} 
                    onChange={e => setFormData({...formData, referenceNumber: e.target.value})}
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

                <div className="flex flex-col gap-1.5 col-span-1 md:col-span-2">
                  <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-medium">Category *</label>
                  <select 
                    value={formData.category} 
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="h-11 px-3.5 rounded bg-surface border border-outline-variant text-on-surface focus:border-primary focus:ring-1 focus:ring-primary appearance-none"
                  >
                    <option>Blouses</option>
                    <option>Bridal</option>
                    <option>Dresses</option>
                    <option>Custom</option>
                    <option>Alterations</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5 md:col-span-1">
                  <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-medium">Fabric</label>
                  <input 
                    type="text" 
                    value={formData.metadata.fabric} 
                    onChange={e => setFormData({...formData, metadata: {...formData.metadata, fabric: e.target.value}})}
                    className="h-11 px-3.5 rounded bg-surface border border-outline-variant text-on-surface focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                
                <div className="flex flex-col gap-1.5 md:col-span-1">
                  <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-medium">Time Spent</label>
                  <input 
                    type="text"
                    placeholder="e.g. 36 hrs" 
                    value={formData.metadata.timeSpent} 
                    onChange={e => setFormData({...formData, metadata: {...formData.metadata, timeSpent: e.target.value}})}
                    className="h-11 px-3.5 rounded bg-surface border border-outline-variant text-on-surface focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="flex flex-col gap-1.5 col-span-1 md:col-span-2">
                  <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-medium">Special Detail / Tag</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Custom Cut, Hand-Pleated"
                    value={formData.metadata.specialDetail} 
                    onChange={e => setFormData({...formData, metadata: {...formData.metadata, specialDetail: e.target.value}})}
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
                  {submitting ? 'Saving...' : 'Save Portfolio Item'}
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
        title="Delete Portfolio Work"
      >
        <div className="flex flex-col gap-6">
          <p className="text-on-surface-variant font-body-md">
            This action will permanently remove <span className="font-semibold text-on-surface">"{workToDelete?.title}"</span> from your portfolio. 
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
              {deleting ? 'Deleting...' : 'Delete Work'}
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

export default WorkManagement;
