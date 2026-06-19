// /* eslint-disable react-hooks/set-state-in-effect */
// import { useState, useEffect } from "react";
// import { X, UploadCloud } from "lucide-react";

// const EditTourModal = ({
//   isOpen,
//   onClose,
//   categories,
//   divisions,
//   tourData,
//   onUpdate,
//   isUpdating = false,
// }) => {
//   const [activeTab, setActiveTab] = useState("basic");

//   const initialFormState = {
//     title: "",
//     tourType: "",
//     division: "",
//     description: "",
//     location: "",
//     costForm: "",
//     maxGuest: "",
//     minAge: "",
//     startDate: "",
//     endDate: "",
//     images: [], // Holds both strings (old URLs) and File objects (new)
//     included: "",
//     excluded: "",
//     amenities: "",
//     tourPlan: "",
//   };

//   const [formData, setFormData] = useState(initialFormState);
//   const [previewUrls, setPreviewUrls] = useState([]);
//   const [deletedImages, setDeletedImages] = useState([]); // 🛠️ Track deleted existing URLs

//   // Handle building clean object URLs for local File objects safely
//   useEffect(() => {
//     if (!formData.images || formData.images.length === 0) {
//       setPreviewUrls([]);
//       return;
//     }

//     const urls = formData.images.map((file) => {
//       if (file instanceof File) {
//         return URL.createObjectURL(file);
//       }
//       return file; // If it's already a hosted URL string
//     });

//     setPreviewUrls(urls);

//     // Cleanup URLs to prevent browser memory leaks
//     return () => {
//       urls.forEach((url) => {
//         if (typeof url === "string" && url.startsWith("blob:")) {
//           URL.revokeObjectURL(url);
//         }
//       });
//     };
//   }, [formData.images]);

//   useEffect(() => {
//     if (isOpen && tourData) {
//       const joinArray = (arr) => (Array.isArray(arr) ? arr.join(", ") : "");
//       const joinNewline = (arr) => (Array.isArray(arr) ? arr.join("\n") : "");

//       setDeletedImages([]); // 🛠️ Reset tracker on modal open
//       setFormData({
//         title: tourData.title || "",
//         tourType: tourData.tourType?._id || tourData.tourType || "",
//         division: tourData.division?._id || tourData.division || "",
//         description: tourData.description || "",
//         location: tourData.location || "",
//         costForm: tourData.costForm || "",
//         maxGuest: tourData.maxGuest || "",
//         minAge: tourData.minAge || "",
//         startDate: tourData.startDate ? tourData.startDate.split("T")[0] : "",
//         endDate: tourData.endDate ? tourData.endDate.split("T")[0] : "",
//         images: Array.isArray(tourData.images) ? [...tourData.images] : [],
//         included: joinArray(tourData.included),
//         excluded: joinArray(tourData.excluded),
//         amenities: joinArray(tourData.amenities),
//         tourPlan: joinNewline(tourData.tourPlan),
//       });
//     }
//   }, [isOpen, tourData]);

//   if (!isOpen) return null;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]:
//         name === "costForm" || name === "maxGuest" || name === "minAge"
//           ? value
//             ? Number(value)
//             : ""
//           : value,
//     }));
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     const formattedPayload = {
//       ...formData,
//       included: formData.included?.trim()
//         ? formData.included
//             .split(",")
//             .map((i) => i.trim())
//             .filter(Boolean)
//         : [],
//       excluded: formData.excluded?.trim()
//         ? formData.excluded
//             .split(",")
//             .map((i) => i.trim())
//             .filter(Boolean)
//         : [],
//       amenities: formData.amenities?.trim()
//         ? formData.amenities
//             .split(",")
//             .map((i) => i.trim())
//             .filter(Boolean)
//         : [],
//       tourPlan: formData.tourPlan?.trim()
//         ? formData.tourPlan
//             .split("\n")
//             .map((i) => i.trim())
//             .filter(Boolean)
//         : [],
//       // 🛠️ Keep image list clean
//       images: formData.images || [],
//       deletedImage: deletedImages, // 🛠️ Deliver target removal items explicitly
//     };

//     try {
//       await onUpdate(tourData._id, formattedPayload);
//       onClose();
//     } catch (error) {
//       console.error("Form transmission rejected:", error);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/40 backdrop-blur-md">
//       <div className="w-full max-w-2xl bg-background border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b border-border bg-muted/20">
//           <h2 className="font-bold text-md tracking-tight">
//             ⚙️ Update Tour Package Configuration
//           </h2>
//           <button
//             type="button"
//             onClick={onClose}
//             disabled={isUpdating}
//             className="p-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground cursor-pointer disabled:opacity-40"
//           >
//             <X size={16} />
//           </button>
//         </div>

//         {/* Tab Selection */}
//         <div className="flex border-b border-border bg-muted/10 text-xs font-bold uppercase tracking-wider select-none">
//           {["basic", "schedule", "features"].map((tab) => (
//             <button
//               key={tab}
//               type="button"
//               onClick={() => setActiveTab(tab)}
//               className={`flex-1 py-3 text-center transition-colors border-b-2 cursor-pointer ${
//                 activeTab === tab
//                   ? "border-primary text-primary bg-background"
//                   : "border-transparent text-muted-foreground hover:text-foreground"
//               }`}
//             >
//               {tab} Info
//             </button>
//           ))}
//         </div>

//         {/* Form Body */}
//         <form
//           onSubmit={handleFormSubmit}
//           className="flex-1 overflow-y-auto p-6 space-y-4 text-left"
//         >
//           {/* TAB 1: BASIC INFO */}
//           {activeTab === "basic" && (
//             <div className="space-y-4 animate-in fade-in duration-200">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="space-y-1">
//                   <label className="text-xs font-bold text-muted-foreground uppercase">
//                     Tour Title *
//                   </label>
//                   <input
//                     type="text"
//                     name="title"
//                     required
//                     placeholder="e.g., Sundarbans Escape"
//                     className="w-full bg-muted/20 border border-border rounded-xl px-3.5 py-2 text-sm focus:border-primary focus:outline-none text-foreground"
//                     value={formData.title}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="space-y-1">
//                   <label className="text-xs font-bold text-muted-foreground uppercase">
//                     Category Type *
//                   </label>
//                   <select
//                     name="tourType"
//                     required
//                     className="w-full bg-muted/20 border border-border rounded-xl px-3.5 py-2 text-sm focus:border-primary text-muted-foreground font-semibold h-[38px] focus:outline-none"
//                     value={formData.tourType}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select Category</option>
//                     {categories.map((c) => (
//                       <option key={c._id || c.id} value={c._id || c.id}>
//                         {c.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="space-y-1">
//                   <label className="text-xs font-bold text-muted-foreground uppercase">
//                     Division *
//                   </label>
//                   <select
//                     name="division"
//                     required
//                     className="w-full bg-muted/20 border border-border rounded-xl px-3.5 py-2 text-sm focus:border-primary text-muted-foreground font-semibold h-[38px] focus:outline-none"
//                     value={formData.division}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select Division</option>
//                     {divisions.map((div) => (
//                       <option key={div._id || div.id} value={div._id || div.id}>
//                         {div.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-1">
//                   <label className="text-xs font-bold text-muted-foreground uppercase">
//                     Base Location Pin *
//                   </label>
//                   <input
//                     type="text"
//                     name="location"
//                     required
//                     placeholder="e.g., Khulna, Bangladesh"
//                     className="w-full bg-muted/20 border border-border rounded-xl px-3.5 py-2 text-sm focus:border-primary focus:outline-none text-foreground"
//                     value={formData.location}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="space-y-1">
//                   <label className="text-xs font-bold text-muted-foreground uppercase">
//                     Base Cost From ($) *
//                   </label>
//                   <input
//                     type="number"
//                     name="costForm"
//                     required
//                     placeholder="e.g., 450"
//                     className="w-full bg-muted/20 border border-border rounded-xl px-3.5 py-2 text-sm focus:border-primary focus:outline-none text-foreground"
//                     value={formData.costForm}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>

//               <div className="space-y-1">
//                 <label className="text-xs font-bold text-muted-foreground uppercase">
//                   Itinerary Description Context
//                 </label>
//                 <textarea
//                   name="description"
//                   rows="3"
//                   placeholder="Elaborate regarding trip plans, routes, milestones..."
//                   className="w-full bg-muted/20 border border-border rounded-xl px-3.5 py-2 text-sm focus:border-primary resize-none focus:outline-none text-foreground"
//                   value={formData.description}
//                   onChange={handleChange}
//                 />
//               </div>

//               {/* Functional Image Upload & Gallery Display */}
//               <div className="space-y-1.5">
//                 <label className="text-xs font-bold text-muted-foreground uppercase">
//                   Package Image Catalog
//                 </label>
//                 <input
//                   type="file"
//                   id="tour-edit-image-upload"
//                   multiple
//                   accept="image/*"
//                   className="hidden"
//                   onChange={(e) => {
//                     const files = Array.from(e.target.files || []);
//                     if (files.length === 0) return;
//                     setFormData((prev) => ({
//                       ...prev,
//                       images: [...prev.images, ...files],
//                     }));
//                     e.target.value = null;
//                   }}
//                 />

//                 <label
//                   htmlFor="tour-edit-image-upload"
//                   className="border-2 border-dashed border-border hover:border-primary/40 rounded-xl p-4 bg-muted/10 text-center cursor-pointer transition-all flex flex-col items-center gap-1 group select-none"
//                 >
//                   <UploadCloud
//                     size={20}
//                     className="text-muted-foreground group-hover:text-primary transition-colors"
//                   />
//                   <span className="text-xs font-semibold text-foreground">
//                     Append new gallery images from system
//                   </span>
//                   <p className="text-[10px] text-muted-foreground">
//                     Accepts multiple PNG, JPG, or WebP files
//                   </p>
//                 </label>

//                 {previewUrls.length > 0 && (
//                   <div className="flex flex-wrap gap-2 pt-2 select-none">
//                     {previewUrls.map((url, index) => (
//                       <div
//                         key={index}
//                         className="relative w-16 h-12 rounded-lg overflow-hidden border border-border group bg-muted"
//                       >
//                         <img
//                           src={url}
//                           alt="Preview"
//                           className="w-full h-full object-cover"
//                         />
//                         <button
//                           type="button"
//                           onClick={(e) => {
//                             e.preventDefault();
//                             const imageToRemove = formData.images[index];

//                             // 🛠️ Track actual string URLs removed to target Cloudinary/DB deletion blocks
//                             if (typeof imageToRemove === "string") {
//                               setDeletedImages((prev) => [
//                                 ...prev,
//                                 imageToRemove,
//                               ]);
//                             }

//                             setFormData((prev) => ({
//                               ...prev,
//                               images: prev.images.filter((_, i) => i !== index),
//                             }));
//                           }}
//                           className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-[10px] cursor-pointer"
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* TAB 2: SCHEDULE & CAPACITY */}
//           {activeTab === "schedule" && (
//             <div className="space-y-4 animate-in fade-in duration-200">
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-1">
//                   <label className="text-xs font-bold text-muted-foreground uppercase">
//                     Start Date
//                   </label>
//                   <input
//                     type="date"
//                     name="startDate"
//                     className="w-full bg-muted/20 border border-border rounded-xl px-3.5 py-2 text-sm focus:border-primary focus:outline-none text-muted-foreground font-medium"
//                     value={formData.startDate}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="space-y-1">
//                   <label className="text-xs font-bold text-muted-foreground uppercase">
//                     End Date
//                   </label>
//                   <input
//                     type="date"
//                     name="endDate"
//                     className="w-full bg-muted/20 border border-border rounded-xl px-3.5 py-2 text-sm focus:border-primary focus:outline-none text-muted-foreground font-medium"
//                     value={formData.endDate}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-1">
//                   <label className="text-xs font-bold text-muted-foreground uppercase">
//                     Max Guest Capacity Limit
//                   </label>
//                   <input
//                     type="number"
//                     name="maxGuest"
//                     placeholder="e.g., 25"
//                     className="w-full bg-muted/20 border border-border rounded-xl px-3.5 py-2 text-sm focus:border-primary focus:outline-none text-foreground"
//                     value={formData.maxGuest}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="space-y-1">
//                   <label className="text-xs font-bold text-muted-foreground uppercase">
//                     Minimum Age Restriction
//                   </label>
//                   <input
//                     type="number"
//                     name="minAge"
//                     placeholder="e.g., 12"
//                     className="w-full bg-muted/20 border border-border rounded-xl px-3.5 py-2 text-sm focus:border-primary focus:outline-none text-foreground"
//                     value={formData.minAge}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* TAB 3: FEATURES & AMENITIES */}
//           {activeTab === "features" && (
//             <div className="space-y-4 animate-in fade-in duration-200">
//               <div className="space-y-1">
//                 <label className="text-xs font-bold text-muted-foreground uppercase">
//                   Included Services (Comma Separated)
//                 </label>
//                 <input
//                   type="text"
//                   name="included"
//                   placeholder="Luxury Transport, Hotel, Breakfast"
//                   className="w-full bg-muted/20 border border-border rounded-xl px-3.5 py-2 text-sm focus:border-primary focus:outline-none text-foreground"
//                   value={formData.included}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="space-y-1">
//                 <label className="text-xs font-bold text-muted-foreground uppercase">
//                   Excluded Services (Comma Separated)
//                 </label>
//                 <input
//                   type="text"
//                   name="excluded"
//                   placeholder="Porter tips, Entry tickets"
//                   className="w-full bg-muted/20 border border-border rounded-xl px-3.5 py-2 text-sm focus:border-primary focus:outline-none text-foreground"
//                   value={formData.excluded}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="space-y-1">
//                 <label className="text-xs font-bold text-muted-foreground uppercase">
//                   Core Amenities (Comma Separated)
//                 </label>
//                 <input
//                   type="text"
//                   name="amenities"
//                   placeholder="Wi-Fi, First-Aid Kit, Tour Guide"
//                   className="w-full bg-muted/20 border border-border rounded-xl px-3.5 py-2 text-sm focus:border-primary focus:outline-none text-foreground"
//                   value={formData.amenities}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="space-y-1">
//                 <label className="text-xs font-bold text-muted-foreground uppercase">
//                   Structured Plan Milestones (Hit Enter for new Day)
//                 </label>
//                 <textarea
//                   name="tourPlan"
//                   rows="3"
//                   placeholder="Day 1: Arrival & Briefing&#10;Day 2: Exploration & Trekking"
//                   className="w-full bg-muted/20 border border-border rounded-xl px-3.5 py-2 text-sm focus:border-primary resize-none focus:outline-none text-foreground font-normal leading-relaxed"
//                   value={formData.tourPlan}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>
//           )}

//           {/* Sticky Actions Footer */}
//           <div className="pt-4 border-t border-border flex items-center justify-end gap-2 bg-background sticky bottom-0 z-10">
//             <button
//               type="button"
//               onClick={onClose}
//               disabled={isUpdating}
//               className="px-4 py-2 border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors cursor-pointer disabled:opacity-40"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isUpdating}
//               className="px-5 py-2 bg-primary text-white hover:bg-primary/90 rounded-xl text-sm font-semibold shadow-md transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-2"
//             >
//               {isUpdating && (
//                 <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//               )}
//               <span>{isUpdating ? "Saving..." : "Save Changes"}</span>
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditTourModal;

/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { X, UploadCloud } from "lucide-react";

const EditTourModal = ({
  isOpen,
  onClose,
  categories,
  divisions,
  tourData,
  onUpdate,
  isUpdating = false,
}) => {
  const [activeTab, setActiveTab] = useState("basic");

  const initialFormState = {
    title: "",
    tourType: "",
    division: "",
    description: "",
    location: "",
    costForm: "",
    maxGuest: "",
    minAge: "",
    startDate: "",
    endDate: "",
    images: [], // Holds both strings (old URLs) and File objects (new)
    included: "",
    excluded: "",
    amenities: "",
    tourPlan: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]); // 🛠️ Track deleted existing URLs

  // Handle building clean object URLs for local File objects safely
  useEffect(() => {
    if (!formData.images || formData.images.length === 0) {
      setPreviewUrls([]);
      return;
    }

    const urls = formData.images.map((file) => {
      if (file instanceof File) {
        return URL.createObjectURL(file);
      }
      return file; // If it's already a hosted URL string
    });

    setPreviewUrls(urls);

    // Cleanup URLs to prevent browser memory leaks
    return () => {
      urls.forEach((url) => {
        if (typeof url === "string" && url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [formData.images]);

  useEffect(() => {
    if (isOpen && tourData) {
      const joinArray = (arr) => (Array.isArray(arr) ? arr.join(", ") : "");
      const joinNewline = (arr) => (Array.isArray(arr) ? arr.join("\n") : "");

      setDeletedImages([]); // 🛠️ Reset tracker on modal open
      setFormData({
        title: tourData.title || "",
        tourType: tourData.tourType?._id || tourData.tourType || "",
        division: tourData.division?._id || tourData.division || "",
        description: tourData.description || "",
        location: tourData.location || "",
        costForm: tourData.costForm || "",
        maxGuest: tourData.maxGuest || "",
        minAge: tourData.minAge || "",
        startDate: tourData.startDate ? tourData.startDate.split("T")[0] : "",
        endDate: tourData.endDate ? tourData.endDate.split("T")[0] : "",
        images: Array.isArray(tourData.images) ? [...tourData.images] : [],
        included: joinArray(tourData.included),
        excluded: joinArray(tourData.excluded),
        amenities: joinArray(tourData.amenities),
        tourPlan: joinNewline(tourData.tourPlan),
      });
    }
  }, [isOpen, tourData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "costForm" || name === "maxGuest" || name === "minAge"
          ? value
            ? Number(value)
            : ""
          : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formattedPayload = {
      ...formData,
      included: formData.included?.trim()
        ? formData.included
            .split(",")
            .map((i) => i.trim())
            .filter(Boolean)
        : [],
      excluded: formData.excluded?.trim()
        ? formData.excluded
            .split(",")
            .map((i) => i.trim())
            .filter(Boolean)
        : [],
      amenities: formData.amenities?.trim()
        ? formData.amenities
            .split(",")
            .map((i) => i.trim())
            .filter(Boolean)
        : [],
      tourPlan: formData.tourPlan?.trim()
        ? formData.tourPlan
            .split("\n")
            .map((i) => i.trim())
            .filter(Boolean)
        : [],
      // 🛠️ Keep image list clean
      images: formData.images || [],
      deletedImage: deletedImages, // 🛠️ Deliver target removal items explicitly
    };

    try {
      await onUpdate(tourData._id, formattedPayload);
      onClose();
    } catch (error) {
      console.error("Form transmission rejected:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/40 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-background border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/20">
          <h2 className="font-bold text-md tracking-tight">
            ⚙️ Update Tour Package Configuration
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={isUpdating}
            className="p-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground cursor-pointer disabled:opacity-40"
          >
            <X size={16} />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-border bg-muted/10 text-xs font-bold uppercase tracking-wider select-none">
          {["basic", "schedule", "features"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-center transition-colors border-b-2 cursor-pointer ${
                activeTab === tab
                  ? "border-primary text-primary bg-background"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab} Info
            </button>
          ))}
        </div>

        {/* Form Body */}
        <form
          onSubmit={handleFormSubmit}
          className="flex-1 overflow-y-auto p-6 space-y-4 text-left"
        >
          {/* TAB 1: BASIC INFO */}
          {activeTab === "basic" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase">
                    Tour Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    placeholder="e.g., Sundarbans Escape"
                    className="w-full bg-muted/20 border border-border rounded-xl px-3.5 py-2 text-sm focus:border-primary focus:outline-none text-foreground"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase">
                    Category Type *
                  </label>
                  <select
                    name="tourType"
                    required
                    className="w-full bg-muted/20 border border-border rounded-xl px-3.5 py-2 text-sm focus:border-primary text-muted-foreground font-semibold h-[38px] focus:outline-none"
                    value={formData.tourType}
                    onChange={handleChange}
                  >
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                      <option key={c._id || c.id} value={c._id || c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase">
                    Division *
                  </label>
                  <select
                    name="division"
                    required
                    className="w-full bg-muted/20 border border-border rounded-xl px-3.5 py-2 text-sm focus:border-primary text-muted-foreground font-semibold h-[38px] focus:outline-none"
                    value={formData.division}
                    onChange={handleChange}
                  >
                    <option value="">Select Division</option>
                    {divisions.map((div) => (
                      <option key={div._id || div.id} value={div._id || div.id}>
                        {div.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase">
                    Base Location Pin *
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    placeholder="e.g., Khulna, Bangladesh"
                    className="w-full bg-muted/20 border border-border rounded-xl px-3.5 py-2 text-sm focus:border-primary focus:outline-none text-foreground"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase">
                    Base Cost From ($) *
                  </label>
                  <input
                    type="number"
                    name="costForm"
                    required
                    placeholder="e.g., 450"
                    className="w-full bg-muted/20 border border-border rounded-xl px-3.5 py-2 text-sm focus:border-primary focus:outline-none text-foreground"
                    value={formData.costForm}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase">
                  Itinerary Description Context
                </label>
                <textarea
                  name="description"
                  rows="3"
                  placeholder="Elaborate regarding trip plans, routes, milestones..."
                  className="w-full bg-muted/20 border border-border rounded-xl px-3.5 py-2 text-sm focus:border-primary resize-none focus:outline-none text-foreground"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              {/* Functional Image Upload & Gallery Display */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground uppercase">
                  Package Image Catalog
                </label>
                <input
                  type="file"
                  id="tour-edit-image-upload"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    if (files.length === 0) return;

                    // ⚙️ Vercel Limit Filter: Restrict incoming assets exceeding 4MB (4 * 1024 * 1024 bytes)
                    const MAX_SIZE = 4 * 1024 * 1024;
                    const validFiles = [];

                    for (const file of files) {
                      if (file.size > MAX_SIZE) {
                        alert(
                          `File "${file.name}" exceeds the maximum payload limit of 4MB. Please reduce its size before uploading.`,
                        );
                      } else {
                        validFiles.push(file);
                      }
                    }

                    if (validFiles.length === 0) {
                      e.target.value = null;
                      return;
                    }

                    setFormData((prev) => ({
                      ...prev,
                      images: [...prev.images, ...validFiles],
                    }));
                    e.target.value = null;
                  }}
                />

                <label
                  htmlFor="tour-edit-image-upload"
                  className="border-2 border-dashed border-border hover:border-primary/40 rounded-xl p-4 bg-muted/10 text-center cursor-pointer transition-all flex flex-col items-center gap-1 group select-none"
                >
                  <UploadCloud
                    size={20}
                    className="text-muted-foreground group-hover:text-primary transition-colors"
                  />
                  <span className="text-xs font-semibold text-foreground">
                    Append new gallery images from system
                  </span>
                  <p className="text-[10px] text-muted-foreground">
                    Accepts multiple PNG, JPG, or WebP files (Max 4MB each)
                  </p>
                </label>

                {previewUrls.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2 select-none">
                    {previewUrls.map((url, index) => (
                      <div
                        key={index}
                        className="relative w-16 h-12 rounded-lg overflow-hidden border border-border group bg-muted"
                      >
                        <img
                          src={url}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            const imageToRemove = formData.images[index];

                            // 🛠️ Track actual string URLs removed to target Cloudinary/DB deletion blocks
                            if (typeof imageToRemove === "string") {
                              setDeletedImages((prev) => [
                                ...prev,
                                imageToRemove,
                              ]);
                            }

                            setFormData((prev) => ({
                              ...prev,
                              images: prev.images.filter((_, i) => i !== index),
                            }));
                          }}
                          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-[10px] cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: SCHEDULE & CAPACITY */}
          {activeTab === "schedule" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    className="w-full bg-muted/20 border border-border rounded-xl px-3.5 py-2 text-sm focus:border-primary focus:outline-none text-muted-foreground font-medium"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    className="w-full bg-muted/20 border border-border rounded-xl px-3.5 py-2 text-sm focus:border-primary focus:outline-none text-muted-foreground font-medium"
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase">
                    Max Guest Capacity Limit
                  </label>
                  <input
                    type="number"
                    name="maxGuest"
                    placeholder="e.g., 25"
                    className="w-full bg-muted/20 border border-border rounded-xl px-3.5 py-2 text-sm focus:border-primary focus:outline-none text-foreground"
                    value={formData.maxGuest}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase">
                    Minimum Age Restriction
                  </label>
                  <input
                    type="number"
                    name="minAge"
                    placeholder="e.g., 12"
                    className="w-full bg-muted/20 border border-border rounded-xl px-3.5 py-2 text-sm focus:border-primary focus:outline-none text-foreground"
                    value={formData.minAge}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FEATURES & AMENITIES */}
          {activeTab === "features" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase">
                  Included Services (Comma Separated)
                </label>
                <input
                  type="text"
                  name="included"
                  placeholder="Luxury Transport, Hotel, Breakfast"
                  className="w-full bg-muted/20 border border-border rounded-xl px-3.5 py-2 text-sm focus:border-primary focus:outline-none text-foreground"
                  value={formData.included}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase">
                  Excluded Services (Comma Separated)
                </label>
                <input
                  type="text"
                  name="excluded"
                  placeholder="Porter tips, Entry tickets"
                  className="w-full bg-muted/20 border border-border rounded-xl px-3.5 py-2 text-sm focus:border-primary focus:outline-none text-foreground"
                  value={formData.excluded}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase">
                  Core Amenities (Comma Separated)
                </label>
                <input
                  type="text"
                  name="amenities"
                  placeholder="Wi-Fi, First-Aid Kit, Tour Guide"
                  className="w-full bg-muted/20 border border-border rounded-xl px-3.5 py-2 text-sm focus:border-primary focus:outline-none text-foreground"
                  value={formData.amenities}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase">
                  Structured Plan Milestones (Hit Enter for new Day)
                </label>
                <textarea
                  name="tourPlan"
                  rows="3"
                  placeholder="Day 1: Arrival & Briefing&#10;Day 2: Exploration & Trekking"
                  className="w-full bg-muted/20 border border-border rounded-xl px-3.5 py-2 text-sm focus:border-primary resize-none focus:outline-none text-foreground font-normal leading-relaxed"
                  value={formData.tourPlan}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {/* Sticky Actions Footer */}
          <div className="pt-4 border-t border-border flex items-center justify-end gap-2 bg-background sticky bottom-0 z-10">
            <button
              type="button"
              onClick={onClose}
              disabled={isUpdating}
              className="px-4 py-2 border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors cursor-pointer disabled:opacity-40"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="px-5 py-2 bg-primary text-white hover:bg-primary/90 rounded-xl text-sm font-semibold shadow-md transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-2"
            >
              {isUpdating && (
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              <span>{isUpdating ? "Saving..." : "Save Changes"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTourModal;
