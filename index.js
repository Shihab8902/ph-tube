//Get the video categories
const getCategories = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const category = await res.json();
    const data = category.data;
    getByCategory(data);
}





//Get data from API by category
const getByCategory = (buttonInfo) => {
    const buttonContainer = document.querySelector("#buttonContainer");

    buttonInfo.forEach(btn => {
        const button = document.createElement("button");
        button.classList = `btn-red font-semibold text-lg text-[#000000b0] bg-[#25252526] py-2 px-5 rounded-md`;
        button.innerText = btn.category;
        button.onclick = () => {
            getDataBasedOnCategory(btn.category_id);
        }
        buttonContainer.appendChild(button);
    });

};




//Render data on the ui based on button click
const getDataBasedOnCategory = async (id = "1000") => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const dataObj = await res.json();
    const data = dataObj.data;
    document.querySelector("#sortButton").addEventListener("click", () => {
        data.sort((first, second) => {
            return parseFloat(second.others.views.split("K")[0]) - parseFloat(first.others.views.split("K")[0]);
        });
        renderData(data);
    });
    renderData(data);
}






//Render data
const renderData = (data) => {
    console.log(data)
    const videoContainer = document.querySelector("#videoContainer");
    videoContainer.innerText = '';

    if (data.length < 1) {
        videoContainer.innerHTML = `
            <div class="text-center my-10">
                <img class="mx-auto mb-6" src="images/Icon.png" alt="" />
                <h3 class="font-bold text-3xl">Oops!! Sorry, There is no <br/> content here</h3>
            </div>
        
        `;
        videoContainer.classList.remove("grid");
    }
    data.forEach(video => {
        const videoCard = document.createElement("div");
        videoContainer.classList.add("grid");

        videoCard.innerHTML = `
        <figure class="relative h-64 ">
        <img class="rounded-md w-full block h-full"
        src="${video.thumbnail}"
        alt="Image unavailable" />

        <p class="absolute bg-black text-white text-sm px-2 bottom-[10px] right-[20px]">${video.others.posted_date && convertSeconds(video.others.posted_date)}</p>

        </figure>
<div class="flex gap-3 my-8">

    <div>
        <img class="w-[40px] block h-[40px] rounded-full"
            src="${video.authors[0].profile_picture}"
            alt="">
    </div>

    <div>
        <h3 class="text-[#171717] font-bold text-lg">${video.title}</h3>
        <div class="flex gap-2 my-2">
            <p class="text-gray-600">${video?.authors[0]?.profile_name}</p>
            ${video?.authors[0]?.verified ? "<img src='images/verified.svg' alt='' />" : ''}
        </div>

        <p class="text-gray-600">${video?.others?.views} views</p>
    
    </div>
</div>
        
        `;

        videoContainer.appendChild(videoCard);
    });
}






//Convert video duration seconds to hour and minutes
const convertSeconds = (sec) => {
    const hours = Math.floor(sec / 3600);
    const remainingSec = sec % 3600;
    const min = Math.floor(remainingSec / 60);
    const postedDateMessage = `${hours}hrs ${min} min ago`;
    return postedDateMessage;
}





getCategories();
getDataBasedOnCategory();