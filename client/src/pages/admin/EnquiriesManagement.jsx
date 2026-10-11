import React, { useState, useEffect, useRef } from 'react';
import apiClient from '../../api/client';
import { format, formatDistanceToNow } from 'date-fns';
import Pagination from '../../components/common/Pagination';
import Toast from '../../components/common/Toast';

const EnquiriesManagement = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination & Filtering
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const abortControllerRef = useRef(null);
  
  // Dashboard counts
  const [counts, setCounts] = useState({
    New: 0, Contacted: 0, 'In Progress': 0, Completed: 0, Closed: 0, All: 0
  });

  // Selected enquiry for the detail panel
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [panelLoading, setPanelLoading] = useState(false);
  const [internalNote, setInternalNote] = useState('');
  
  // Feedback
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchEnquiries = async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    try {
      const query = new URLSearchParams({
        page,
        limit: 10,
        status: statusFilter,
        ...(typeFilter !== 'All' && { relatedType: typeFilter }),
        ...(search && { search })
      }).toString();
      
      const response = await apiClient.get(`/enquiries?${query}`, {
        signal: controller.signal
      });
      setEnquiries(response.data.data.enquiries);
      setTotalPages(response.data.data.totalPages);
      setTotalCount(response.data.data.total);
      if (Object.keys(response.data.data.counts).length > 0) {
         setCounts(response.data.data.counts);
      }
    } catch (err) {
      if (err.name === 'CanceledError' || err.message === 'canceled' || err.code === 'ERR_CANCELED') {
        return; // Ignore intentional abort
      }
      setError(err.response?.data?.message || 'Failed to fetch enquiries');
    } finally {
      if (abortControllerRef.current === controller) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (search !== searchInput) {
        setSearch(searchInput);
        setPage(1);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [searchInput, search]);

  useEffect(() => {
    fetchEnquiries();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [page, statusFilter, typeFilter, search]);

  const handleFilterChange = (setter, value) => {
    setter(value);
    setPage(1);
  };

  const handleRowClick = async (id) => {
    setPanelLoading(true);
    try {
      const response = await apiClient.get(`/enquiries/${id}`);
      setSelectedEnquiry(response.data.data);
      setInternalNote(response.data.data.notes || '');
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to load enquiry details.', type: 'error' });
    } finally {
      setPanelLoading(false);
    }
  };

  const handleStatusUpdate = async (status) => {
    if (!selectedEnquiry || isUpdating) return;
    setIsUpdating(true);
    try {
      const response = await apiClient.put(`/enquiries/${selectedEnquiry._id}/status`, { status, notes: internalNote });
      setSelectedEnquiry({ ...selectedEnquiry, status: response.data.data.status, notes: response.data.data.notes });
      setToast({ message: 'Status updated successfully', type: 'success' });
      fetchEnquiries(); // Refresh list to update counts
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to update status', type: 'error' });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveNote = async () => {
    if (!selectedEnquiry) return;
    setIsSaving(true);
    try {
      const response = await apiClient.put(`/enquiries/${selectedEnquiry._id}/notes`, { notes: internalNote });
      setSelectedEnquiry({ ...selectedEnquiry, notes: response.data.data.notes });
      setToast({ message: 'Notes saved successfully.', type: 'success' });
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to save notes. Please try again.', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  const resetFilters = () => {
    setStatusFilter('All');
    setTypeFilter('All');
    setSearch('');
    setSearchInput('');
    setPage(1);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'bg-primary-fixed text-on-primary-fixed';
      case 'Contacted': return 'bg-secondary-fixed text-on-secondary-fixed-variant';
      case 'In Progress': return 'bg-secondary-container text-on-secondary-container';
      case 'Completed': return 'bg-surface-container-highest text-on-surface-variant';
      case 'Closed': return 'bg-error-container text-on-error-container';
      default: return 'bg-surface-container text-on-surface';
    }
  };

  return (
    <div className="flex flex-col w-full gap-6">
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Desk Registry • Studio 1</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-normal">Enquiries</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage bespoke bridal consultations, custom fittings, and tailoring follow-ups.</p>
        </div>
      </div>

      {/* METRICS SUMMARY CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* NEW */}
        <div className="bg-surface-container-lowest p-5 rounded-lg shadow-sm flex flex-col justify-between relative overflow-hidden group hover:-translate-y-0.5 transition-all cursor-pointer" onClick={() => { setStatusFilter('New'); setPage(1); }}>
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">New Requests</span>
            <span className="px-2 py-0.5 rounded-md font-label-sm text-label-sm bg-secondary-container text-on-secondary-container">Action Req.</span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-headline-lg text-headline-lg text-primary font-normal">{counts.New}</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Awaiting reply</span>
          </div>
          <div className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full bg-primary/5 pointer-events-none"></div>
        </div>

        {/* CONTACTED */}
        <div className="bg-surface-container-lowest p-5 rounded-lg shadow-sm flex flex-col justify-between relative overflow-hidden group hover:-translate-y-0.5 transition-all cursor-pointer" onClick={() => { setStatusFilter('Contacted'); setPage(1); }}>
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Contacted</span>
            <span className="px-2 py-0.5 rounded-md font-label-sm text-label-sm bg-tertiary-fixed text-on-tertiary-fixed">Pending Call</span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-headline-lg text-headline-lg text-tertiary font-normal">{counts.Contacted}</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Follow-up ongoing</span>
          </div>
          <div className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full bg-tertiary/5 pointer-events-none"></div>
        </div>

        {/* IN PROGRESS */}
        <div className="bg-surface-container-lowest p-5 rounded-lg shadow-sm flex flex-col justify-between relative overflow-hidden group hover:-translate-y-0.5 transition-all cursor-pointer" onClick={() => { setStatusFilter('In Progress'); setPage(1); }}>
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">In Progress</span>
            <span className="px-2 py-0.5 rounded-md font-label-sm text-label-sm bg-secondary-fixed text-on-secondary-fixed-variant">Active Fitting</span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-headline-lg text-headline-lg text-secondary font-normal">{counts['In Progress']}</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Measurements / Trials</span>
          </div>
          <div className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full bg-secondary/5 pointer-events-none"></div>
        </div>

        {/* COMPLETED */}
        <div className="bg-surface-container-lowest p-5 rounded-lg shadow-sm flex flex-col justify-between relative overflow-hidden group hover:-translate-y-0.5 transition-all cursor-pointer" onClick={() => { setStatusFilter('Completed'); setPage(1); }}>
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Delivered</span>
            <span className="px-2 py-0.5 rounded-md font-label-sm text-label-sm bg-surface-container-highest text-on-surface-variant">This Month</span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-headline-lg text-headline-lg text-on-surface font-normal">{counts.Completed}</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Successfully tailored</span>
          </div>
          <div className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full bg-surface-container-highest pointer-events-none"></div>
        </div>
      </div>

      {/* SEARCH & FILTER CONTROLS BAR */}
      <div className="bg-surface-container-lowest p-3 rounded-lg shadow-sm flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-3">
        <div className="relative flex-1 min-w-0 md:min-w-[280px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-outline">search</span>
          <input
            className="w-full h-11 pl-10 pr-4 rounded-lg bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container transition-colors"
            placeholder="Search by customer name, phone, or subject..."
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <select
              className="h-11 px-3 py-2 pr-8 rounded-lg bg-surface-container-low font-label-md text-label-md text-on-surface appearance-none focus:outline-none cursor-pointer"
              value={typeFilter}
              onChange={(e) => handleFilterChange(setTypeFilter, e.target.value)}
            >
              <option value="All">Type: All Enquiries</option>
              <option value="Service">Service</option>
              <option value="Design">Design</option>
              <option value="Work">Similar Work</option>
            </select>
            <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[18px] text-outline pointer-events-none">expand_more</span>
          </div>
          <div className="relative">
            <select
              className="h-11 px-3 py-2 pr-8 rounded-lg bg-surface-container-low font-label-md text-label-md text-on-surface appearance-none focus:outline-none cursor-pointer"
              value={statusFilter}
              onChange={(e) => handleFilterChange(setStatusFilter, e.target.value)}
            >
              <option value="All">Status: All</option>
              <option value="New">New ({counts.New})</option>
              <option value="Contacted">Contacted ({counts.Contacted})</option>
              <option value="In Progress">In Progress ({counts['In Progress']})</option>
              <option value="Completed">Completed ({counts.Completed})</option>
              <option value="Closed">Closed ({counts.Closed})</option>
            </select>
            <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[18px] text-outline pointer-events-none">expand_more</span>
          </div>
          <button
            onClick={resetFilters}
            className="h-11 px-3 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider transition-colors flex items-center gap-1.5"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">filter_alt_off</span>
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* CORE DUAL-VIEW WORKSPACE: MASTER TABLE + INTERACTIVE DETAIL PANEL */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* LEFT / MAIN SECTION: ENQUIRIES TABLE (Col 7 or 12 if no selection) */}
        <div className={`${selectedEnquiry ? 'xl:col-span-7' : 'xl:col-span-12'} flex flex-col bg-surface-container-lowest rounded-lg shadow-sm overflow-hidden transition-all duration-300`}>
          <div className="p-4 px-6 bg-surface-container-low flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-headline-sm text-headline-sm text-on-surface">Incoming Requests</span>
              <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm">{totalCount} Total</span>
            </div>
          </div>
          <div className="w-full">
            <table className="w-full text-left border-collapse block md:table">
              <thead className="hidden md:table-header-group">
                <tr className="bg-surface-container text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                  <th className="py-3 px-4 pl-6">Customer</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-3">Type</th>
                  <th className="py-3 px-3">Submitted</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="font-body-sm text-body-sm text-on-surface divide-y md:divide-y divide-surface-container-highest block md:table-row-group">
                {loading && enquiries.length === 0 ? (
                  <tr><td colSpan="6" className="text-center py-6">Loading...</td></tr>
                ) : enquiries.length === 0 ? (
                  <tr><td colSpan="6" className="text-center py-6 text-on-surface-variant">No enquiries found</td></tr>
                ) : enquiries.map((enquiry) => (
                  <tr
                    key={enquiry._id}
                    className={`${selectedEnquiry?._id === enquiry._id ? 'bg-secondary-container/25' : 'hover:bg-surface-container-low'} transition-colors group cursor-pointer flex flex-col md:table-row p-4 md:p-0 border-b border-surface-container-highest md:border-none gap-2 md:gap-0`}
                    onClick={() => handleRowClick(enquiry._id)}
                  >
                    <td className="py-2 md:py-3.5 px-0 md:px-4 md:pl-6 font-medium flex md:table-cell items-center w-full">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${enquiry.status === 'New' ? 'bg-primary' : 'bg-transparent'}`}></div>
                        <div>
                          <div className="font-label-lg text-label-lg text-on-surface font-semibold">{enquiry.name}</div>
                          <div className="font-label-sm text-label-sm text-on-surface-variant">{enquiry.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-1 md:py-3.5 px-0 md:px-4 flex justify-between md:table-cell items-center w-full border-t border-surface-container-highest/50 md:border-none pt-2 md:pt-3.5">
                      <span className="md:hidden font-label-sm text-on-surface-variant uppercase text-[10px] tracking-wider shrink-0 mr-2">Subject</span>
                      <div className="font-medium text-on-surface truncate max-w-[200px] text-right md:text-left">{enquiry.message}</div>
                    </td>
                    <td className="py-1 md:py-3.5 px-0 md:px-3 flex justify-between md:table-cell items-center w-full border-t border-surface-container-highest/50 md:border-none pt-2 md:pt-3.5">
                      <span className="md:hidden font-label-sm text-on-surface-variant uppercase text-[10px] tracking-wider shrink-0 mr-2">Type</span>
                      <span className="px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container-high text-on-surface-variant whitespace-nowrap">
                        {enquiry.relatedType || 'General'}
                      </span>
                    </td>
                    <td className="py-1 md:py-3.5 px-0 md:px-3 flex justify-between md:table-cell items-center w-full border-t border-surface-container-highest/50 md:border-none pt-2 md:pt-3.5 whitespace-nowrap text-on-surface-variant font-label-sm text-label-sm">
                      <span className="md:hidden font-label-sm text-on-surface-variant uppercase text-[10px] tracking-wider shrink-0 mr-2">Submitted</span>
                      <span>{formatDistanceToNow(new Date(enquiry.createdAt), { addSuffix: true })}</span>
                    </td>
                    <td className="py-1 md:py-3.5 px-0 md:px-3 flex justify-between md:table-cell items-center w-full border-t border-surface-container-highest/50 md:border-none pt-2 md:pt-3.5">
                      <span className="md:hidden font-label-sm text-on-surface-variant uppercase text-[10px] tracking-wider shrink-0 mr-2">Status</span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-label-sm text-label-sm ${getStatusColor(enquiry.status)} whitespace-nowrap font-medium`}>
                        {enquiry.status === 'New' && <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>}
                        {enquiry.status}
                      </span>
                    </td>
                    <td className="py-2 md:py-3.5 px-0 md:px-4 md:pr-6 md:text-right flex justify-end md:table-cell items-center w-full border-t border-surface-container-highest/50 md:border-none pt-3 md:pt-3.5 whitespace-nowrap">
                      <button className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded bg-primary/10 hover:bg-primary/20 text-primary font-label-sm text-label-sm transition-colors w-full md:w-auto shadow-sm" type="button">
                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={page} totalPages={totalPages} setPage={setPage} disabled={loading} />
        </div>

        {/* RIGHT / SLIDE-IN DETAIL PANEL: ENQUIRY DETAIL (Col 5) */}
        {selectedEnquiry && (
          <div className="fixed inset-0 z-50 p-4 flex flex-col items-center justify-center bg-on-surface/40 backdrop-blur-sm xl:relative xl:inset-auto xl:z-auto xl:p-0 xl:bg-transparent xl:backdrop-blur-none xl:block xl:col-span-5 animate-fade-in" id="detailPanel">
            <div className="bg-surface-container-lowest rounded-lg shadow-xl xl:shadow-sm p-6 relative w-full max-w-lg xl:max-w-none max-h-[90vh] overflow-y-auto xl:h-auto xl:overflow-visible">
              {panelLoading ? (
                <div className="text-center py-10">Loading details...</div>
              ) : (
                <>
                  <div className="flex items-start justify-between gap-4 pb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-secondary-container text-on-secondary-container">
                          {selectedEnquiry.relatedType || 'General Enquiry'}
                        </span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-label-sm text-label-sm ${getStatusColor(selectedEnquiry.status)} font-semibold`}>
                          {selectedEnquiry.status}
                        </span>
                      </div>
                      <h2 className="font-headline-md text-headline-md text-on-surface">{selectedEnquiry.name}</h2>
                      <div className="flex items-center gap-3 mt-1 text-on-surface-variant font-label-sm text-label-sm">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[15px]">schedule</span>
                          {format(new Date(selectedEnquiry.createdAt), "PPp")}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[15px]">call</span>
                          {selectedEnquiry.phone}
                        </span>
                      </div>
                    </div>
                    <button onClick={() => setSelectedEnquiry(null)} className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors" title="Close Panel">
                      <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                  </div>

                  <div className="p-3 bg-surface-container-low rounded-lg flex flex-wrap items-center gap-2 mt-2">
                    <a className="flex-1 min-w-[130px] h-11 px-3 rounded-lg bg-surface-container-lowest hover:bg-surface-container-high text-primary font-label-md text-label-md flex items-center justify-center gap-2 transition-all shadow-sm" href={`tel:${selectedEnquiry.phone}`}>
                      <span className="material-symbols-outlined text-[18px]">call</span>
                      <span>Call Customer</span>
                    </a>
                    <a className="flex-1 min-w-[140px] h-11 px-3 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center gap-2 transition-all shadow-sm" href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, '')}`} rel="noopener noreferrer" target="_blank">
                      <span className="material-symbols-outlined text-[18px]">chat</span>
                      <span>Open WhatsApp</span>
                    </a>
                    
                    {selectedEnquiry.status === 'New' && (
                      <button disabled={isUpdating} onClick={() => handleStatusUpdate('Contacted')} className="w-full h-11 px-4 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md flex items-center justify-center gap-2 transition-all shadow-sm mt-1 disabled:opacity-50" type="button">
                        <span className="material-symbols-outlined text-[18px]">done</span>
                        <span>{isUpdating ? 'Updating...' : 'Mark as Contacted'}</span>
                      </button>
                    )}

                    <div className="flex items-center justify-between w-full pt-1 px-1 text-on-surface-variant font-label-sm text-label-sm">
                      <span>Update status:</span>
                      <div className="flex items-center gap-3">
                        <button disabled={isUpdating} onClick={() => handleStatusUpdate('In Progress')} className="hover:text-primary transition-colors font-medium disabled:opacity-50">In Progress</button>
                        <button disabled={isUpdating} onClick={() => handleStatusUpdate('Completed')} className="hover:text-primary transition-colors font-medium disabled:opacity-50">Completed</button>
                        <button disabled={isUpdating} onClick={() => handleStatusUpdate('Closed')} className="hover:text-error transition-colors disabled:opacity-50">Close</button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Customer's Message</span>
                    </div>
                    <div className="p-4 rounded-lg bg-surface-container text-on-surface font-body-md text-body-md leading-relaxed relative">
                      <span className="material-symbols-outlined text-outline/30 absolute right-3 bottom-2 text-[32px] pointer-events-none">format_quote</span>
                      “{selectedEnquiry.message}”
                    </div>
                  </div>

                  {selectedEnquiry.relatedId && (
                    <div className="mt-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Related {selectedEnquiry.relatedType}</span>
                      </div>
                      <div className="p-3 bg-surface-container rounded-lg flex items-center gap-3.5">
                        {selectedEnquiry.relatedId.images && selectedEnquiry.relatedId.images[0] && (
                          <div className="w-16 h-20 rounded-md overflow-hidden bg-surface-container-high shrink-0 shadow-sm">
                            <img alt={selectedEnquiry.relatedId.name || selectedEnquiry.relatedId.title} className="w-full h-full object-cover" src={selectedEnquiry.relatedId.images[0].url} />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-label-lg text-label-lg text-on-surface font-medium truncate">{selectedEnquiry.relatedId.name || selectedEnquiry.relatedId.title}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Internal Notes</span>
                      <span className="material-symbols-outlined text-[16px] text-outline">lock</span>
                    </div>
                    <div className="space-y-2">
                      <textarea
                        className="w-full p-3 rounded-lg bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container transition-colors resize-none"
                        placeholder="Add an internal atelier note or fit specification..."
                        rows="3"
                        value={internalNote}
                        onChange={(e) => setInternalNote(e.target.value)}
                      ></textarea>
                      <div className="flex justify-end">
                        <button disabled={isSaving} onClick={handleSaveNote} className="px-4 py-2 rounded-md bg-secondary text-on-secondary font-label-sm text-label-sm hover:bg-secondary/90 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5" type="button">
                          {isSaving && <span className="w-3.5 h-3.5 border-2 border-on-secondary border-t-transparent rounded-full animate-spin"></span>}
                          {isSaving ? 'Saving...' : 'Save Notes'}
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ message: '', type: 'success' })} 
      />
    </div>
  );
};

export default EnquiriesManagement;
