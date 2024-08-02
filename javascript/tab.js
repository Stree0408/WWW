var cnt = document.querySelectorAll(".tab-button").length;



// for (let i=0; i<cnt; i++) {
//     document.querySelectorAll(".tab-button")[`${i}`].addEventListener("click", function() {
//         openTab(i);
//     });
// }
// or 
document.querySelector(".list").addEventListener("click", function(e) {
    openTab(e.target.dataset.id);
    })




function openTab(i) {
    $('.tab-button').removeClass('orange');
    $('.tab-button').eq(`${i}`).addClass('orange');
    $('.tab-content').removeClass('show');
    $('.tab-content').eq(`${i}`).addClass('show');
}

console.log(document.querySelector(".tab-button").dataset.id)