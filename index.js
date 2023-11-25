let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("save-inputBtn");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

// Getting the leads and rendering it on the screen, if there's any in the localstorage
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  renderLeads(myLeads);
}

// eventlistener and function to save the leads to localstorage and render it as list, from the input field
inputBtn.addEventListener("click", function () {
  if (inputEl.value) {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
  }
  renderLeads(myLeads);
});

// eventlistener and function to save the leads to localstorage and render it as list, from the current tab
tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        renderLeads(myLeads)
    })
});

// eventlistener and function to delete the leads from localstorage and myLeads variable and render the empty myLeads array
deleteBtn.addEventListener("click", function () {
  let deleteConfirmation = confirm(
    "Do you want to delete all the current leads?"
  );
  if (deleteConfirmation) {
    localStorage.clear();
    myLeads = [];
    renderLeads(myLeads);
  }
});

// Function to render items from an array as a list item on the display
function renderLeads(leads) {
  let listItem = "";
  for (let i = 0; i < leads.length; i++) {
    listItem += `
        <li>
          <a href=${leads[i]} target="_blank">${leads[i]}</a>
        </li>
      `;
  }
  ulEl.innerHTML = listItem;
}
