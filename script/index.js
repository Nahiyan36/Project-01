const cll=(amm)=>{
    const elem=amm.map((el) => `<p class="btn">${el}</p>`)
    return elem.join('  ');
}









const jsonProgramme=()=>{
fetch("https://openapi.programming-hero.com/api/levels/all")
.then(pro=> pro.json())
.then(inf=>jsonReal(inf))
}
const removeActive=()=>{
    const remove=document.querySelectorAll(".lesson-btn")
  
    remove.forEach((btn) => btn.classList.remove('active'))
}

const lessonShow=(id)=>{
    const url=`https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(da =>da.json())
    .then(dat =>{
        removeActive()
        
        const dhor=document.getElementById(`lesson-btn-${id}`)
        // console.log(dhor)
        dhor.classList.add('active')
        fi(dat.data)})
        
}
// "word": "Eager",
// "meaning": "আগ্রহী",
// "pronunciation": "ইগার",
// "level": 1,
// "sentence": "The kids were eager to open their gifts.",
// "points": 1,
// "partsOfSpeech": "adjective",
// "synonyms": [
// "enthusiastic",
// "excited",
// "keen"
// ],

const loadWordDetail= async(id)=>{
 
    const url=`https://openapi.programming-hero.com/api/word/${id}`
    // console.log(url)
    const res=await fetch(url);
    const details=await res.json();
    displayWordDetails(details.data);
}
const displayWordDetails=(word)=>{
// console.log(word)
const detailsBox=document.getElementById("details-container")
detailsBox.innerHTML=`
<div class="">
<h2 class="text-2xl font-bold">${word.word}(<i class="fa-solid fa-microphone"></i>)</h2><br>
<p class="text-xl font-bold ">Meaning</p><br>
<p>${word.meaning}</p><br>
  <p class="text-xl font-bold ">Example</p>
  <p class="text-gray-500">${word.sentence}</p><br>
  <p>সমার্থক শব্দ গুলো</p><br>
</div>
<div class="nahiyan flex gap-5">
 ${cll(word.synonyms)}
</div>
`
document.getElementById("my_modal").showModal()

}



const fi=(info)=>{
    const cre=document.getElementById('dota');
    cre.innerHTML="";
    if(info==0){
        cre.innerHTML=`
          <div class="col-span-full">
          <img src="./assets/alert-error.png" class="max-w-[100px] my-0 mx-auto">
  <p class="font-bangla text-center text-[#79716B]">আপনি এখনো কোন Lesson Select করেন ন</p><br>
<h1 class="font-bangla text-center text-[35px] ">একটি Lesson Select করুন।</h1>
</div>
        `
    }
    info.forEach(jj => {
       const done=document.createElement('div');
       done.innerHTML=`
      <div class="bg-white max-w-[547px] text-center rounded-xl shadow-sm align py-10 px-5 space-y-4" id="word-container">
  <p class="font-bold text-2xl">${jj.word ? jj.word :"There is no word."}</p>
  <p class="font-semibold">${jj.meaning ? jj.meaning : "There is no meaning."} /Pronounciation</p>
  <div class="font-semibold text-2xl font-bangla">"${jj.pronunciation ? jj.pronunciation :"There is no pronunciation."}"</div>
  <div class="flex justify-between items-center">
<button class="btn hover:bg-teal-500 " onclick="loadWordDetail(${jj.id})"><i class="fa-solid fa-circle-info"></i></button>
<button class="btn hover:bg-teal-500"><i class="fa-solid fa-volume-high"></i></button>
  </div>
</div>
       `
       cre.appendChild(done)
    });

}

const jsonReal=(dat)=>{
    const callDiv=document.getElementById('jsonButton')
    callDiv.innerHTML="";
    dat.data.forEach(element => {
        // console.log(element);
        const create=document.createElement("div");
        create.innerHTML=`
        <button id="lesson-btn-${element.level_no}" onclick="lessonShow(${element.level_no})" class="btn btn-outline btn-primary lesson-btn">
        <i class="fa-solid fa-question"></i> 
        Lesson ${element.level_no}</button>
        `
        callDiv.appendChild(create)
    });
}
jsonProgramme()