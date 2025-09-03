export default function Footer() {
    return(
        <footer className="absulate text-gray-500 text-sm mt-10">
            <div className="flex flex-wrap justify-center gap-3">
                  <a href="#">Meta</a>
                  <a href="#">About</a>
                  <a href="#">Blog</a>
                  <a href="#">Jobs</a>
                  <a href="#">Help</a>
                  <a href="#">API</a>
                  <a href="#">Privacy</a>
                  <a href="#">Terms</a>
                  <a href="#">Locations</a>
                  <a href="#">Instagram Lite</a>
                  <a href="#">Meta AI</a>
                  <a href="#">Meta AI Articles</a>
                  <a href="#">Threads</a>
                  <a href="#">Contact Uploading & Non-Users</a>
                  <a href="#">Meta Verified</a>
            </div>
            <div className="flex flex-col items-center mt-4 space-y-1">
                <div>
                    <select className="bg-transparent text-gray-500 text-sm outline-none">
                        <option>English</option>
                        <option>Bangla</option>
                        <option>Hindi</option>
                    </select>
                </div>
            </div>
        </footer>
    )
}

