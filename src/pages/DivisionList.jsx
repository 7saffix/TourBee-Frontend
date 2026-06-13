import { useState, useRef } from "react";
import {
  MapPinned,
  Plus,
  X,
  Edit2,
  Trash2,
  // Image as ImageIcon,
  UploadCloud,
} from "lucide-react";
import {
  // useEditDivisionMutation,
  useGetDivisionQuery,
  // useCreateDivisionMutation,
  // useDeleteDivisionMutation,
} from "../redux/Api/tour.api";
import Loader from "../components/Loader";

const DivisionList = () => {
  const {
    data: responseData,
    isLoading,
    isError,
    error,
  } = useGetDivisionQuery();
  // const [createDivision] = useCreateDivisionMutation();
  // const [updateDivision] = useEditDivisionMutation();
  // const [deleteDivision] = useDeleteDivisionMutation();

  const divisions = responseData?.data || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const fileInputRef = useRef(null);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({ name: "", description: "" });
    setSelectedFile(null);
    setPreviewUrl("");
    setIsModalOpen(true);
  };

  const openEditModal = (division) => {
    setEditingId(division._id || division.id);
    setFormData({
      name: division.name,
      description: division.description || "",
    });
    setSelectedFile(null);
    setPreviewUrl(division.thumbnail || "");
    setIsModalOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSaveDivision = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const multiPartForm = new FormData();
    multiPartForm.append("name", formData.name.trim());
    multiPartForm.append("description", formData.description.trim());

    if (selectedFile) {
      multiPartForm.append("thumbnail", selectedFile);
    }

    try {
      if (editingId) {
        // const res = await updateDivision({
        //   divisionId: editingId,
        //   divisionInfo: multiPartForm,
        // }).unwrap();
        // console.log(res);
        // } else {
        //    await createDivision(multiPartForm).unwrap();
        //    console.log("Division created successfully");
        //
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to commit operation parameters:", err);
    }
  };

  // const handleDelete = async (id) => {
  //   if (
  //     window.confirm(
  //       "Are you sure you want to permanently delete this division?",
  //     )
  //   ) {
  //     try {
  //       await deleteDivision(id).unwrap();
  //       console.log("Division deleted successfully");
  //     } catch (err) {
  //       console.error("Deletion exception encountered:", err);
  //     }
  //   }
  // };

  if (isLoading) {
    return (
      <div className="w-full min-h-[50vh] flex items-center justify-center">
        <Loader size="lg" label="Syncing division clusters..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-4 rounded-xl max-w-xl mx-auto text-center mt-8">
        <p className="font-semibold">Failed to load divisions</p>
        <p className="text-xs opacity-80 mt-1">
          {error?.data?.message || "An unexpected network error occurred."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <MapPinned className="text-primary" size={24} />
            Tour Divisions
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Live database view of regions, localized imagery, and system trip
            nodes.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary/90 px-4 py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-primary/10 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus size={16} />
          Add Division
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-background border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-border bg-muted/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground select-none">
                {/* <th className="p-4 w-28">Thumbnail</th> */}
                <th className="p-4 w-52">Division Name</th>
                <th className="p-4">Description</th>
                <th className="p-4 w-28 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-sm">
              {divisions.length > 0 ? (
                divisions.map((div) => (
                  <tr
                    key={div._id || div.id}
                    className="hover:bg-muted/20 transition-colors group"
                  >
                    {/* <td className="p-4">
                      {div.thumbnail ? (
                        <img
                          src={div.thumbnail}
                          alt={div.name}
                          className="h-11 w-20 object-cover rounded-lg border border-border bg-muted shrink-0 shadow-sm"
                        />
                      ) : (
                        <div className="h-11 w-20 rounded-lg border border-dashed border-border bg-muted/40 flex items-center justify-center text-muted-foreground/40 shrink-0">
                          <ImageIcon size={14} />
                        </div>
                      )}
                    </td> */}
                    <td className="p-4 font-bold text-foreground tracking-wide align-middle whitespace-nowrap">
                      {div.name}
                    </td>
                    <td className="p-4 text-muted-foreground align-middle max-w-xs sm:max-w-md">
                      <p className="line-clamp-2 leading-relaxed">
                        {div.description || "—"}
                      </p>
                    </td>
                    <td className="p-4 text-right align-middle whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(div)}
                          className="cursor-pointer p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all border border-transparent hover:border-primary/20"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          // onClick={() => handleDelete(div._id || div.id)}
                          className="cursor-pointer p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all border border-transparent hover:border-destructive/20"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-12 text-muted-foreground font-medium italic"
                  >
                    No records found inside the database collection.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Layout Configuration */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/40 backdrop-blur-md">
          <div className="w-full max-w-md bg-background border border-border rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-border bg-muted/20">
              <h2 className="font-bold text-md tracking-tight flex items-center gap-2">
                <MapPinned size={18} className="text-primary" />
                {editingId
                  ? "Modify Division Records"
                  : "Add New Area Division"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveDivision} className="p-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Division Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Sylhet"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-muted/20 border border-border rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Thumbnail Cover Image
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current.click()}
                  className="w-full border-2 border-dashed border-border hover:border-primary/40 rounded-xl p-4 bg-muted/10 hover:bg-primary/5 cursor-pointer flex flex-col items-center justify-center gap-2 group transition-all"
                >
                  {previewUrl ? (
                    <div className="relative w-full h-28 rounded-lg overflow-hidden border border-border shadow-inner">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-semibold gap-1.5">
                        <UploadCloud size={14} /> Replace Image
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="p-2.5 bg-background rounded-xl border border-border text-muted-foreground group-hover:text-primary transition-colors shadow-sm">
                        <UploadCloud size={18} />
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-semibold text-foreground">
                          Click to upload from device
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          Supports PNG, JPG or WebP images
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Summary Description
                </label>
                <textarea
                  rows="3"
                  placeholder="Type structural specifications or cultural summaries here..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full bg-muted/20 border border-border rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveDivision}
                  type="submit"
                  className="px-4 py-2 bg-primary text-white hover:bg-primary/90 rounded-xl text-sm font-semibold shadow-md shadow-primary/10 transition-colors cursor-pointer"
                >
                  {editingId ? "Apply Changes" : "Save Document"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DivisionList;
