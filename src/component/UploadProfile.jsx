import { useState } from "react"
import { uploadProfileImage } from "../api/profile";
import { profileIageDelete } from "../api/profileImagedelete";


export default function  UploadProfile({open, onClose}){
     const [file, setFile] = useState(null); 
     const [profileImage, setProfileImage] = useState(null);

     if(!open) return null;

     function handleFile(selected){
            const f = selected?.[0];
            if(f) {
                console.log("Selected File:", f);
                setFile({
                    file:f,
                    url:URL.createObjectURL(f),
                    type: f.type,
                });
            }
     }  

     function handleDelete(){
        setFile(null);
     }

     async function handleRemoveProfile() {
        if (!confirm("Are you sure you want to remove your profile image?")) return;

        try {
            await profileIageDelete();
            alert("Profile Image deleted");
            setProfileImage(null); 
            setFile(null);         
        } catch (err) {
            console.error(err);
            alert("Failed to remove profile image");
        }
        }

    async function handleSave() {
        if(!file) return;

        try{
            const res = await uploadProfileImage(file.file);
            console.log("Update", res.data);
            
         
            onClose();
        } catch (err) {
            console.error("Updloaad Failed", err);
        
        }
     }

     return(
        <>
            <div onClick={onClose} className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                 <div onClick={(e)=>e.stopPropagation()} className="w-full max-w-md shadow-lg rounded-2xl overflow-hidden relative bg-white">
                    <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl transition-all">
                        ✕
                    </button>

                    <div className="border-b border-gray-300 text-center py-3">
                       <h2 className="font-bold text-lg">Update Profile Photo</h2>
                    </div>

                    <div className="flex flex-col items-center justify-start py-6 px-6 space-y-4 ">
                        <div className="w-32 h-32  rounded-full border overflow-hidden">
                            {file ? (
                                <img src={file.url} alt="preview" className="w-full h-full" />
                            ): (<img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="" className="w-full h-full object-cover"/> )}
                        </div>
                            <label htmlFor="profileUpload" className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold cursor-pointer">
                                Change Photo
                                <input 
                                       id="profileUpload"
                                       type="file" 
                                       accept="image/*"
                                       onChange={(e) => handleFile(e.target.files)}
                                       className="hidden"
                                />
                            </label>

                            {/* delete button  */}
                            {file  &&(
                                <button onClick={handleDelete} className="w-full py-2 mb-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                                   Delete photo     
                                </button>
                            )}

                        <div className="flex gap-3 w-full mt-4">
                            <button onClick={onClose} className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
                                Cancle
                            </button>
                            <button onClick={handleRemoveProfile} className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-red-300">
                                Remove profile
                            </button>

                            <button  onClick={handleSave} disabled={!file} className={`flex-1 py-2 rounded ${
                                file ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"
                            }`}>
                                Save
                            </button>
                        </div>
                            
                    </div>
                    
                 

                 </div>

            </div>
        </>
     )
}