import React, { useState, useEffect, useRef } from 'react';
import apiClient from '../../api/client';
import { format } from 'date-fns';
import Pagination from '../../components/common/Pagination';
import Toast from '../../components/common/Toast';

const CustomRequestsManagement = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const abortControllerRef = useRef(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  
  // Feedback
  const [toast, setToast] = useState({ message: '', type: 'success' });

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [counts, setCounts] = useState({
    New: 0,
    Reviewed: 0,
    Contacted: 0,
    'In Progress': 0,
    Completed: 0,
    Closed: 0,
    All: 0
  });

  const statuses = ['New', 'Reviewed', 'Contacted', 'In Progress', 'Completed', 'Closed'];

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm !== searchInput) {
        setSearchTerm(searchInput);
        setPage(1);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [searchInput, searchTerm]);

  useEffect(() => {
    fetchRequests();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [page, statusFilter, searchTerm]);

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setPage(1);
  };

  const fetchRequests = async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      setLoading(true);
      const queryParams = new URLSearchParams({ page, limit: 10 });
      if (statusFilter !== 'All') queryParams.append('status', statusFilter);
      if (searchTerm) queryParams.append('search', searchTerm);
      
      const response = await apiClient.get(`/custom-requests?${queryParams.toString()}`, {
        signal: controller.signal
      });
      if (response.data.success) {
        const { customRequests, page: responsePage, total, totalPages: responseTotalPages, counts: newCounts } = response.data.data;
        setRequests(customRequests);
        setTotalPages(responseTotalPages);
        setTotalCount(total);
        if (newCounts) setCounts(newCounts);
      }
    } catch (err) {
      if (err.name === 'CanceledError' || err.message === 'canceled' || err.code === 'ERR_CANCELED') {
        return; // Ignore intentional abort
      }
      setError('Failed to fetch custom requests.');
      console.error(err);
    } finally {
      if (abortControllerRef.current === controller) {
        setLoading(false);
      }
    }
  };

  const updateStatus = async (status) => {
    if (!selectedRequest) return;
    try {
      setIsUpdating(true);
      const response = await apiClient.put(`/custom-requests/${selectedRequest._id}`, {
        status,
        notes: adminNotes,
      });
      if (response.data.success) {
        const updatedRequest = response.data.data;
        setSelectedRequest(updatedRequest);
        setRequests(requests.map(r => r._id === updatedRequest._id ? updatedRequest : r));
        setToast({ message: 'Saved successfully.', type: 'success' });
      }
    } catch (err) {
      console.error('Failed to update', err);
      setToast({ message: 'Failed to save. Please try again.', type: 'error' });
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'bg-secondary-container text-on-secondary-fixed-variant';
      case 'Reviewed': return 'bg-surface-container-high text-on-surface-variant';
      case 'Contacted': return 'bg-surface-container-highest text-on-surface-variant';
      case 'In Progress': return 'bg-secondary-fixed text-on-secondary-fixed';
      case 'Completed': return 'bg-primary-container text-on-primary';
      case 'Closed': return 'bg-error-container text-on-error-container';
      default: return 'bg-surface-container text-on-surface';
    }
  };

  const filteredRequests = requests;

  return (
    <div className="flex flex-col w-full h-full max-w-[1600px] mx-auto px-4 sm:px-8 py-6 space-y-6 lg:space-y-8">
      
      {/* Header & Metrics */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-container"></span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant font-semibold">Desk Registry • Atelier Reference Inbox</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Custom Requests</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Review customer references, inspect textile specifications, and manage tailored orders.</p>
        </div>
      </div>

      {/* Metric Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">New Requests</span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-headline-lg text-headline-lg text-on-surface font-semibold leading-none">
              {counts.New}
            </span>
          </div>
          <p className="mt-2 font-body-sm text-body-sm text-on-surface-variant">Awaiting reference review</p>
        </div>
        <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">In Progress</span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-headline-lg text-headline-lg text-on-surface font-semibold leading-none">
              {counts['In Progress']}
            </span>
          </div>
          <p className="mt-2 font-body-sm text-body-sm text-on-surface-variant">Active Stitching</p>
        </div>
        <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Completed</span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-headline-lg text-headline-lg text-on-surface font-semibold leading-none">
              {counts.Completed}
            </span>
          </div>
          <p className="mt-2 font-body-sm text-body-sm text-on-surface-variant">Done & Delivered</p>
        </div>
        <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Total Requests</span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-headline-lg text-headline-lg text-on-surface font-semibold leading-none">
              {counts.All}
            </span>
          </div>
          <p className="mt-2 font-body-sm text-body-sm text-on-surface-variant">All time submissions</p>
        </div>
      </section>

      {/* Filter & Search Toolbar */}
      <div className="p-3 bg-surface-container-lowest rounded-xl shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        <div className="flex-1 relative flex items-center">
          <span className="material-symbols-outlined text-[20px] text-outline absolute left-3 pointer-events-none">search</span>
          <input 
            type="text"
            className="w-full h-11 pl-10 pr-4 bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant/60 focus:bg-surface-container-lowest focus:outline-none transition-all border-none"
            placeholder="Search by customer name, phone, garment type..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <select 
              className="h-11 pl-3 pr-8 bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface appearance-none cursor-pointer focus:outline-none border-none"
              value={statusFilter}
              onChange={handleFilterChange}
            >
              <option value="All">Status: All</option>
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant absolute right-2.5 top-3 pointer-events-none">expand_more</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start flex-1 min-h-0">
        
        {/* LEFT COLUMN: List */}
        <div className="xl:col-span-7 bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col min-w-0">
          <div className="px-6 py-4 flex items-center justify-between bg-surface-container-low/60 border-b border-surface-container-high/40 shrink-0">
            <div className="flex items-center gap-2">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Client Submissions</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-surface-container-highest font-label-sm text-label-sm text-on-surface-variant font-semibold">{filteredRequests.length} Total</span>
            </div>
          </div>
          
          <div className="overflow-y-auto flex-1 w-full max-w-full">
            {loading ? (
              <div className="p-8 text-center text-on-surface-variant">Loading requests...</div>
            ) : error ? (
              <div className="p-8 text-center text-error">{error}</div>
            ) : filteredRequests.length === 0 ? (
              <div className="p-8 text-center text-on-surface-variant">No custom requests found.</div>
            ) : (
              <table className="w-full text-left border-collapse block md:table table-fixed">
                <colgroup className="hidden md:table-column-group">
                  <col className="w-16 md:w-20" />
                  <col className="w-[40%]" />
                  <col className="w-[35%]" />
                  <col className="w-24 md:w-28" />
                </colgroup>
                <thead className="sticky top-0 bg-surface-container-low z-10 border-b border-surface-container-high/40 hidden md:table-header-group">
                  <tr className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                    <th className="py-3 px-4 text-center">Ref</th>
                    <th className="py-3 px-2">Customer</th>
                    <th className="py-3 px-2">Garment</th>
                    <th className="py-3 px-2 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y md:divide-y divide-surface-container-high/40 font-body-sm text-body-sm block md:table-row-group">
                  {filteredRequests.map(req => (
                    <tr 
                      key={req._id}
                      onClick={() => {
                        setSelectedRequest(req);
                        setAdminNotes(req.notes || '');
                      }}
                      className={`transition-colors cursor-pointer group flex flex-col md:table-row p-4 md:p-0 border-b border-surface-container-high/40 md:border-none gap-2 md:gap-0 ${selectedRequest?._id === req._id ? 'bg-secondary-container/20' : 'hover:bg-surface-container-low/50'}`}
                    >
                      <td className="py-2 md:py-3 px-0 md:px-4 flex md:table-cell items-center w-full">
                        <div className="flex items-center gap-4 w-full">
                          <div className="w-12 h-12 md:w-10 md:h-10 rounded-md overflow-hidden bg-surface-container relative shadow-xs shrink-0 md:mx-auto">
                            {req.referenceImages && req.referenceImages.length > 0 ? (
                              <img src={req.referenceImages[0].url} alt="Reference" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center text-outline"><span className="material-symbols-outlined text-[18px]">no_photography</span></div>
                            )}
                          </div>
                          <div className="flex flex-col min-w-0 md:hidden">
                            <div className="font-semibold text-on-surface truncate">{req.name}</div>
                            <div className="text-on-surface-variant font-label-sm text-label-sm truncate">{req.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden md:table-cell py-3 px-2 min-w-0">
                        <div className="font-semibold text-on-surface truncate">{req.name}</div>
                        <div className="text-on-surface-variant font-label-sm text-label-sm truncate">{req.phone}</div>
                      </td>
                      <td className="py-2 md:py-3 px-0 md:px-2 flex md:table-cell items-center w-full border-t border-surface-container-high/20 md:border-none pt-2 md:pt-3">
                        <span className="md:hidden w-20 shrink-0 font-label-sm text-on-surface-variant uppercase text-[10px] tracking-wider">Garment</span>
                        <div className="text-left min-w-0 flex-1">
                          <div className="text-on-surface font-medium truncate">{req.garmentType}</div>
                          <div className="text-on-surface-variant text-[11px] truncate">{format(new Date(req.createdAt), 'dd MMM yyyy, p')}</div>
                        </div>
                      </td>
                      <td className="py-2 md:py-3 px-0 md:px-2 flex md:table-cell items-center text-center w-full border-t border-surface-container-high/20 md:border-none pt-2 md:pt-3">
                        <span className="md:hidden w-20 shrink-0 text-left font-label-sm text-on-surface-variant uppercase text-[10px] tracking-wider">Status</span>
                        <div className="text-left md:text-center flex-1">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-label-sm text-label-sm font-semibold truncate max-w-full ${getStatusColor(req.status)}`}>
                            {req.status}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <Pagination page={page} totalPages={totalPages} setPage={setPage} disabled={loading} />
        </div>

        {/* RIGHT COLUMN: Details */}
        <div className={`xl:col-span-5 bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col min-w-0 ${selectedRequest ? 'fixed inset-0 z-50 p-4 bg-on-surface/40 backdrop-blur-sm xl:relative xl:inset-auto xl:z-auto xl:p-0 xl:bg-transparent xl:backdrop-blur-none xl:block' : 'hidden xl:flex'}`}>
          {selectedRequest ? (
            <div className="bg-surface-container-lowest rounded-xl shadow-xl xl:shadow-none w-full max-w-lg xl:max-w-none max-h-[90vh] xl:max-h-none overflow-y-auto xl:overflow-visible xl:flex xl:flex-col relative">
              <div className="flex flex-col h-full">
              <div className="p-6 bg-surface-container-low/50 border-b border-surface-container-high/40">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm font-semibold tracking-wide ${getStatusColor(selectedRequest.status)}`}>
                      {selectedRequest.status}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">#{selectedRequest._id.substring(18,24).toUpperCase()}</span>
                  </div>
                  <button onClick={() => setSelectedRequest(null)} className="xl:hidden p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors" title="Close Panel">
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">{selectedRequest.name}</h3>
                    <div className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                      <span>{selectedRequest.phone}</span>
                      <span>•</span>
                      <span>{format(new Date(selectedRequest.createdAt), 'dd MMM yyyy')}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 flex gap-3 border-t border-surface-container-highest">
                  <a href={`tel:${selectedRequest.phone}`} className="flex-1 h-10 px-3 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md inline-flex items-center justify-center gap-2 transition-colors">
                    <span className="material-symbols-outlined text-[18px] text-primary">call</span>
                    <span>Call Client</span>
                  </a>
                  <a href={`https://wa.me/91${selectedRequest.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex-1 h-10 px-3 rounded-lg bg-[#25D366]/10 text-[#075E54] hover:bg-[#25D366]/20 font-label-md text-label-md inline-flex items-center justify-center gap-2 transition-colors">
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Status Update */}
              <div className="p-6 bg-surface-container-lowest border-b border-surface-container-highest">
                <h4 className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-semibold mb-3">Update Pipeline Status</h4>
                <div className="flex flex-wrap gap-2">
                  {statuses.map(status => (
                    <button
                      key={status}
                      onClick={() => updateStatus(status)}
                      disabled={isUpdating || selectedRequest.status === status}
                      className={`px-3 py-1.5 rounded font-label-sm text-label-sm transition-colors ${selectedRequest.status === status ? getStatusColor(status) : 'bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant'}`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* References */}
              <div className="p-6 border-b border-surface-container-highest">
                <h4 className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-semibold mb-4">Client Reference Visuals</h4>
                {selectedRequest.referenceImages && selectedRequest.referenceImages.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {selectedRequest.referenceImages.map((img, idx) => (
                      <a key={idx} href={img.url} target="_blank" rel="noopener noreferrer" className="rounded-lg overflow-hidden bg-surface-container-low shadow-sm group block aspect-square relative">
                        <img src={img.url} alt="Reference" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 drop-shadow-md">open_in_new</span>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-surface-container-low rounded-lg text-center text-on-surface-variant font-body-sm text-body-sm">
                    No reference images uploaded
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="p-6 border-b border-surface-container-highest space-y-4">
                <h4 className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-semibold">Structured Fit & Specs</h4>
                <div className="grid grid-cols-2 gap-3 text-body-sm">
                  <div className="p-3 bg-surface-container-low/40 rounded-lg">
                    <div className="font-label-sm text-[11px] text-on-surface-variant uppercase">Garment Type</div>
                    <div className="font-semibold text-on-surface mt-0.5">{selectedRequest.garmentType}</div>
                  </div>
                  <div className="p-3 bg-surface-container-low/40 rounded-lg">
                    <div className="font-label-sm text-[11px] text-on-surface-variant uppercase">Target Handover</div>
                    <div className="font-semibold text-on-surface mt-0.5">{selectedRequest.preferredDate ? format(new Date(selectedRequest.preferredDate), 'dd MMM yyyy') : 'Not specified'}</div>
                  </div>
                </div>
                
                <div className="p-4 rounded-xl bg-surface-container-low/70 space-y-2 mt-2">
                  <div className="flex items-center gap-2 text-primary font-label-sm text-label-sm font-semibold uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[16px]">format_quote</span>
                    Client Specification Notes
                  </div>
                  <p className="font-body-md text-body-md text-on-surface leading-relaxed whitespace-pre-wrap">
                    {selectedRequest.requirements}
                  </p>
                </div>
              </div>

              {/* Admin Notes */}
              <div className="p-6 bg-surface-container-low/60 rounded-b-xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">lock</span>
                  <h4 className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-semibold">Private Internal Notes</h4>
                </div>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add private tailoring notes here (e.g. measurements, fabric choices)..."
                  className="w-full p-3 bg-surface-container-lowest rounded-lg border border-surface-container-high focus:border-primary focus:ring-1 focus:ring-primary text-body-sm font-body-sm text-on-surface mb-3 min-h-[100px] resize-y"
                />
                <button
                  onClick={() => updateStatus(selectedRequest.status)}
                  disabled={isUpdating}
                  className="px-4 py-2 bg-secondary text-on-secondary hover:bg-secondary/90 rounded-lg font-label-sm text-label-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                >
                  {isUpdating && <span className="w-3.5 h-3.5 border-2 border-on-secondary border-t-transparent rounded-full animate-spin"></span>}
                  {isUpdating ? 'Saving...' : 'Save Notes'}
                </button>
              </div>

            </div>
          </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-on-surface-variant p-8 h-full">
              <span className="material-symbols-outlined text-4xl mb-3">architecture</span>
              <p className="font-body-md text-body-md text-center max-w-sm">Select a custom request from the list to view references and manage tailoring workflow.</p>
            </div>
          )}
        </div>
      </div>
      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ message: '', type: 'success' })} 
      />
    </div>
  );
};

export default CustomRequestsManagement;
