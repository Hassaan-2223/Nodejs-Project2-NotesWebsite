



const delbtn = document.querySelectorAll("#delbtn");

delbtn.forEach((btn)=>{
    btn.addEventListener("click",(e)=>{
        console.log('hi')
        const userid = e.target.getAttribute('user-id');
        fetch(`/delete/${userid}`,{
            method: "DELETE",
        }).then((res)=> console.log(res))
        .then((data)=>{
            console.log(data);
            // location.reload();
            location.href = location.href;
            // setTimeout(() => {
            //     window.location.href = '/';
            // }, 1000);
        }).catch(err => console.error(err));
    })
})


// const delBtn = document.querySelectorAll("#delBtn");

// delBtn.forEach((btn)=>{
//     btn.addEventListener("click",(e)=>{
//         const userid = e.target.getAttribute("user-id");
//         fetch(`/delete/${userid}`,{
//             method: "DELETE",
//         }).then((res) => res.json())
//         .then((data) => {
//           console.log(data);
//           location.reload();
//         })
//         .catch(error => console.error(error));
//     })
// })
