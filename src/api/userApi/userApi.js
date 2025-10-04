export const updateUser = async (id, data) => {
    const response = await fetch(`http://127.0.0.1:8000/api/users/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(data),
    });

    if(!response.ok) {
         const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update user");
    }

    return response.json();
}