import { useState } from "react";
import { fetchPost, uploadPhotos } from "../api/photos";
import { useDispatch } from "react-redux";
import { setPosts } from "../features/postSlice";



export default function CreatePost({ onClose }) { 
  const [files, setFiles] = useState([]);
  const [caption, setCaption] = useState("");

  const dispatch = useDispatch();


   function handleFiles(selected) {
    const arr = Array.from(selected).map((f) => ({
      file: f,
      url: URL.createObjectURL(f),
      type: f.type,
    }));
    setFiles(arr);
  }

async function sharePost() {
  try {
    const formData = new FormData(); 

    // Add selected files
    files.forEach((f) => formData.append("images[]", f.file));

    // Add caption
    formData.append("caption", caption); 

    // Call API
    const uploaded = await uploadPhotos(formData);
    console.log("Uploaded:", uploaded);
    alert("Post create successfully");
    fetchPost().then((data)=>{
          dispatch(setPosts(data));
        })
    onClose();
  } catch (err) {
    console.error("Upload failed:", err);
    alert("Upload failed");
  }
}


  return(
   <>
<div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
  <div className="w-full max-w-5xl shadow-lg rounded-3xl overflow-hidden relative bg-gray-100 max-h-[90vh]">
    

    <button
      onClick={onClose}
      className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl transition-all"
    >
      ✕
    </button>

 
    <div className="bg-white border-b border-gray-300 text-center py-3">
      <h2 className="font-motserrat font-bold text-lg">Create new post</h2>
    </div>

 
    <div className="flex flex-col items-center justify-start py-8 px-8 space-y-4 w-full overflow-y-auto">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="blue"
        className="w-16 h-16 mb-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 16.5v-9m-4.5 4.5h9"
        />
      </svg>

      <p className="mb-2 font-motserrat text-2xl text-center">
        Drag photos and videos here
      </p>

    
      <div className="w-full">
        <label className="block mb-2 font-motserrat font-semibold text-gray-700">
          Caption
        </label>
        <input
          type="text"
          value={caption}
          onChange={(e)=>setCaption(e.target.value)}
          placeholder="Write a caption..."
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
        />
      </div>

     
      <label className="bg-blue-600 text-white px-5 py-2 rounded-md font-motserrat font-bold cursor-pointer">
        Select from computer
        <input
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
      </label>

      {/* image show after upload  */}
      {files.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full mt-4">
          {files.map((f, i) => (
            <div
              key={i}
              className="relative w-full aspect-square border rounded-lg overflow-hidden"
            >
              {f.type.startsWith("image/") ? (
                <img
                  src={f.url}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={f.url}
                  className="w-full h-full object-cover"
                  controls
                />
              )}
            </div>
          ))}
        </div>
      )}

   
      <div className="w-full flex justify-end mt-4">
        <button
          onClick={sharePost}
          disabled={files.length === 0}
          className={`px-4 py-2 rounded ${
            files.length === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white"
          }`}
        >
          Share
        </button>
      </div>
    </div>
  </div>
</div>


   
   </>
  )


}
