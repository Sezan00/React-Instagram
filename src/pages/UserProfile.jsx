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
import { toggleFollow } from '../api/userFollowApi/userFollow';
import  FollowersModal  from '../component/FollowersModal';

export default function UserProfile() {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);

    // const [posts, setPosts] = useState([]);
    const posts = useSelector((state) => state.posts.posts)
    const [selectedPost, setSelectedPost] = useState(null);
    const {username} = useParams();
    const [currentUserEmail, setCurrentUserEmail] = useState(false);
    const saveduser = localStorage.getItem("user") ?? false;
    const currentUser = saveduser ? JSON.parse(saveduser) : null;
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoadig] = useState(false)
    
    const [openFollowers, setOpenFollowers] = useState(false);
    const [openFollowing, setOpenFollowing] = useState(false);

    console.log('CurrentUser:', currentUser);
    console.log("User Profile:", user);
    //  const { followersCount, followingsCount, isFollowing, loading } = useSelector(
    //     (state) => state.follow
    // );
    

    const dispatch = useDispatch();
    //when user will change then it's show that user data post followers ETC
    useEffect(()=>{
        fetchUserByUsername(username).then((data) => {
            
            console.log("Api response:", data)
            setUser(data.user);
            dispatch(setPosts(data.posts));
            setFollowers(data.followers)
            setFollowing(data.following)
        })
        
    },[username, dispatch]);


    useEffect(() => {
        setIsFollowing(followers.find(item => item.follower_id == currentUser.id) ?? false)
        
    }, [user])

    const updateProfile = (makeUser) => {
        setUser(makeUser);
    }


    const handleFollow = async () => {
        await toggleFollow(user.id)

        fetchUserByUsername(username).then((data) => {
            setUser(data.user);
            dispatch(setPosts(data.posts));
            setFollowers(data.followers)
        })
        
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
                                if (currentUser?.email === user.email) {
                                    setOpen(true);
                                }
                                }}
                            />
                            )}

                        {/* <p>{user?.profile_image ?? 'NO PROFILE IMAGE'}</p> */}
                        { currentUser?.email === user?.email && (
                            <UploadProfile 
                            open={open} 
                            updateProfile={updateProfile} 
                            users={user} 
                            onClose={() => setOpen(false)} />
                        )}
                        
                    </div>


                    <div className="ml-24 mt-4">

               {user && (
                    <div className="flex items-center gap-5">
                    <p className="font-semibold text-lg">
                        {user.username}
                    </p>

                    {currentUser.id === user.id ? (
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
                            <p onClick={()=> setOpenFollowers(true)} className='cursor-pointer'>
                                {followers.length} followers</p>
                            <p onClick={()=> setOpenFollowing(true)} className='cursor-pointer'>
                                {following.length} following
                            </p>
                        </div>
                        <FollowersModal
                            open={openFollowers}
                            onClose={() => setOpenFollowers(false)}
                            users={followers}    
                            title="Followers"
                            />

                        <FollowersModal
                            open={openFollowing}
                            onClose={()=> setOpenFollowing(false)}
                            users={following}
                            title="Following"
                        />


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
