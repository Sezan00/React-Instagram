import React, { useEffect, useState } from 'react'
import Sidebar from '../component/Slider';
import Profile from './Profile';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UploadProfile from '../component/UploadProfile';
import { Bookmark, Boxes, Contact } from 'lucide-react';
import { fetchPost } from '../api/photos';
import { fetchUser } from '../api/user';
import { setPosts } from '../features/postSlice';
import { fetchUserByUsername } from '../api/usernameApi/userAPi';
import ModalCarousel from '../component/ModalCarousel';
import { followToggle, fetchUserProfile } from '../features/follow/followSlice';

export default function UserProfile() {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);

    // const [posts, setPosts] = useState([]);
    const posts = useSelector((state) => state.posts.posts)
    const [selectedPost, setSelectedPost] = useState(null);
    const {username} = useParams();
    const [currentUserEmail, setCurrentUserEmail] = useState(false);

    console.log(username);
    

    const dispatch = useDispatch();

    useEffect(()=>{
        fetchUserByUsername(username).then((data) => {
            setUser(data.user);
            dispatch(setPosts(data.posts));
        })
        const currentUser = localStorage.getItem("user") ?? false;
        setCurrentUserEmail(JSON.parse(currentUser)?.email ?? false)
    },[username, dispatch]);


    useEffect(() => {
        console.log("CALLING USE EFFECT FOR USER");
        
    }, [user])

    const updateProfile = (makeUser) => {
        console.log("==> ", makeUser.user.profile_image);
        
        setUser(makeUser);
    }


    const { followersCount, followingsCount, isFollowing, loading } = useSelector(
        (state) => state.follow
    );

    useEffect(()=>{
        if(user){
            dispatch(fetchUserProfile(user.id));
        }
    }, [user, dispatch]);

    const handleFollow = () => {
        if (user) {
        dispatch(followToggle(user.id));
  }
    }
    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-120 mt-14 flex-col justify-center">
                <div className="flex">


                    <div className="flex">
                       {user && (
                            <img
                                src={
                                user?.profile_image ||
                                "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                                }
                                className="w-32 h-32 rounded-full object-cover border border-gray-300 shadow"
                                alt=""
                                onClick={() => {
                                if (currentUserEmail === user.email) {
                                    setOpen(true);
                                }
                                }}
                            />
                            )}

                        {/* <p>{user?.profile_image ?? 'NO PROFILE IMAGE'}</p> */}
                        { currentUserEmail === user?.email && (
                            <UploadProfile open={open} updateProfile={updateProfile} user={{ user }} onClose={() => setOpen(false)} />
                        )}
                        
                    </div>


                    <div className="ml-24 mt-4">

               {user && (
                    <div className="flex items-center gap-5">
                    <p className="font-semibold text-lg">
                        {user.username}
                    </p>

                    {currentUserEmail === user.email ? (
                        <>
                        <button className="bg-gray-200 px-4 py-1 rounded text-sm font-medium">
                            Edit profile
                        </button>
                        <button className="bg-gray-200 px-4 py-1 rounded text-sm font-medium">
                            View archive
                        </button>
                        </>
                    ) : (
                        <>
                        <button onClick={handleFollow} disabled={loading} className="bg-gray-200 px-4 py-1 rounded text-sm font-medium">
                            {isFollowing ? "Unfollow" : "Follow"}
                        </button>
                        <button className="bg-gray-200 px-4 py-1 rounded text-sm font-medium">
                            Message
                        </button>
                        </>
                    )}
                    </div>
                )}
                        <div className="flex items-center gap-5 mt-4">
                            <p>{posts.length} posts</p>
                            <p>{followersCount} followers</p>
                            <p>{followingsCount} following</p>
                        </div>

                        <div className="flex items-center gap-5 mt-5">
                            <p className="font-semibold">{user ? (user.full_name) : <span className='inline-block h-5 w-32 bg-gray-300 rounded animate-pulse'></span>}</p>
                        </div>
                        <div className="flex">
                            <button className="bg-gray-200 px-1 py-1 text-sm rounded-2xl">@Thered</button>
                        </div>
                    </div>
                    
                </div>
                {/* story highlight section  */}
                <div className="flex gap-15 mt-10">
                    <img src="https://via.placeholder.com/150" className="w-20 h-20 rounded-full object-cover"></img>
                    <img src="https://via.placeholder.com/150" className="w-20 h-20 rounded-full object-cover"></img>
                    <img src="https://via.placeholder.com/150" className="w-20 h-20 rounded-full object-cover"></img>
                    <img src="https://via.placeholder.com/150" className="w-20 h-20 rounded-full object-cover"></img>
                    <img src="https://via.placeholder.com/150" className="w-20 h-20 rounded-full object-cover"></img>
                    <img src="https://via.placeholder.com/150" className="w-20 h-20 rounded-full object-cover"></img>
                </div>

                <div className="flex gap-50 mt-20">
                    <button className='px-2 py-2 hover:bg-gray-100'>
                        <Boxes size={32} strokeWidth={2} />
                    </button>
                    <button className='px-2 py-2 hover:bg-gray-100'>
                        <Bookmark size={32} strokeWidth={2} />
                    </button>

                    <button className='px-2 py-2 hover:bg-gray-100'>
                        <Contact size={32} strokeWidth={2} />
                    </button>

                </div>

                <div className="flex items-center my-6 ">
                    <div className=" flex-grow border-t border-gray-300"></div>

                </div>
                {/* image card  */}

                <div className="grid grid-cols-3 gap-4 justify-items-center mt-5">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="w-48 h-48 border border-gray-300 cursor-pointer"
                            onClick={() => setSelectedPost(post)}
                        >
                            {post.photos.length > 0 ? (
                                <img
                                    src={`data:image/jpeg;base64,${post.photos[0].image}`}
                                    alt={`post-${post.id}`}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-500">
                                    No image
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {selectedPost && (
                    <ModalCarousel
                        post={selectedPost}
                        onClose={() => setSelectedPost(null)}
                    />
                )}

            </div>
        </div>
    );
}
