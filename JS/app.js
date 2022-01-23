/*--- Banner ---*/

const alertBanner = document.getElementById("alert");

alertBanner.innerHTML = 

`<div class="alert-banner">
  <p><strong>Alert:</strong> You have unread messages!</p>
  <p class="alert-banner-close">x</p> 
 </div>
`;

alertBanner.addEventListener('click', e => {
  const element = e.target;
  if (element.classList.contains("alert-banner-close")) {
    alertBanner.style.display = "none"
  }
});

/*-- Closing Messages --*/

const newMessage = document.getElementById("notificationList");
newMessage.addEventListener('click', e =>{
    const message = e.target;
    if(message.classList.contains("close-message")){
        message.parentNode.style.display = "none";
    }

});

/*--- Chart Widgets ---*/


/*-- Line graph --*/

let trafficCanvas = document.getElementById("traffic-chart");

let trafficData = {
    labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"],
    datasets: [{
        data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],
        backgroundColor: 'rgba(116, 119, 191, .3)',
        borderWidth: 1,
        lineTension: 0.5
    }]
}


let hourlyData = {
   labels: ["7-8am", "9-10am", "11-12am", "1-2pm", "3-4pm", "5-6pm", "7-8pm", "9-10pm", "11-12pm"],
   datasets: [{
     data: [150, 185, 140, 200, 150, 175, 125, 35, 50],
   }]
}

let dailyData1 = {
  labels: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"],
  datasets: [{
    data: [2500, 1350, 1400, 1200, 2500, 1750, 2450],
  }]
}

let weeklyData = {
  labels: ["week 1", "week 2", "week 3", "week 4", "week 5", "week 6", "week 7", "week 8", "week 9"],
  datasets: [{
    data: [1500, 1700, 2000, 2500, 1400, 1650, 1020, 1500, 1250, 1450],
  }]
}

let monthlyData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [{
    data: [1500, 1850, 1400, 2000, 1500, 1750, 1250, 3500, 5000, 2500, 1100, 1340],
  }]
}




let trafficOptions = {
    backgroundColor: 'rgba(112, 104, 201, .5)',
    fill: true,
    aspectRatio: 2.5,
    animation: {
        duration: 0
    },
    scales: {
        y: {
          beginAtZero: true
        }
    },
    plugins: {
        legend: {
        display: false
        }
    }
};

let trafficChart = new Chart(trafficCanvas, {
    type: 'line',
    data: trafficData,
    options: trafficOptions
});


const updateChart = (chart, newData) => {
   chart.data.labels = newData.labels;
   chart.data.datasets[0].data = newData.datasets[0].data;
   chart.update();
};


const trafficNavigation = document.querySelector('.traffic-nav');
 trafficNavigation.addEventListener('click', (e) => {
    let targetNav = e.target;
    if (targetNav.tagName === "LI") {
        targetNav.className = "active";
    }
    
    const trafficList = document.querySelectorAll('.traffic-nav li');
    for (let i = 0; i < trafficList.length; i++) {
       const activeList = trafficList[i];
       if (activeList.className === 'active') {
          activeList.className += ' traffic-active';
          let listName = activeList.textContent;
       if (listName === 'Hourly') {
          updateChart(trafficChart, hourlyData);
       }  
       else if (listName === 'Daily') {
           updateChart(trafficChart, dailyData1);
       }  
       else if (listName === 'Weekly') {
        updateChart(trafficChart, weeklyData);
       }  
       else if (listName === 'Monthly') {
        updateChart(trafficChart, monthlyData);
       } 
       } else {
          activeList.className = 'traffic-nav-link';
       }
    
    }
  });





/*--- Bar graph --*/

const dailyCanvas = document.getElementById("daily-chart");

const dailyData = {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [{
        label: '# of Hits',
        data: [75, 115, 175, 125, 225, 200, 100],
        backgroundColor: '#7477BF',
        borderWidth: 1
    }]
};

const dailyOptions = {
    scales: {
      y: {
          beginAtZero: true
      }
    },
    plugins: {
        legend: {
        display: false
        }
    }
};

let dailyChart = new Chart(dailyCanvas, {
    type: 'bar',
    data: dailyData,
    options: dailyOptions

});


/*--- Doughnut Chart ---*/

const mobileCanvas = document.getElementById("mobile-users-chart");

const mobileData = {
    labels: ["Desktop", "Tablet", "Phones"],
    datasets: [{
      label: '# of Users',
      data: [2000, 550, 500],
      borderWidth: 0,
      backgroundColor: [
        '#7477BF',
        '#78CF82',
        '#51B6C8'
      ]
    }]
};

const mobileOptions = {
    aspectRatio: 1.9,
    plugins: {
        legend: {
            position: 'right',
            labels: {
                boxWidth: 20,
                fontStyle: 'bold'
            }
        }
    }
};

let mobileChart = new Chart(mobileCanvas, {
    type: 'doughnut',
    data: mobileData,
    options: mobileOptions
});

/*--- Messaging Section ---*/

const user = document.getElementById("userfield");
const message = document.getElementById("messagefield");
const send = document.getElementById("send");

send.addEventListener('click', () => {
    
    if (user.value === "" && message.value === "") {
        alert("Please fill out user and message fields before sending");
      } else if (user.value === "" ) {
        alert("Please fill out user field before sending");
      } else if (message.value === "") {
        alert("Please fill out message field before sending");
      } else {
        alert(`Message successfully sent to: ${user.value}`);
      }
});


// Local Storage
const email = document.querySelector('#email');
const public = document.querySelector('#public');
const timezone = document.querySelector('.form-field')
const save = document.querySelector('.button-primary');
const cancel = document.querySelector('.button-secondary');

recallStorage();

save.addEventListener('click', () => {
  localStorage.setItem("email", email.checked);
  localStorage.setItem("public", public.checked);
  localStorage.setItem("timezone", timezone.value);
});

cancel.addEventListener('click', () => {
  localStorage.removeItem("email");
  localStorage.removeItem("public");
  localStorage.removeItem("timezone");
  email.checked = null;
  public.checked = null;
  timezone.value = "";
});

function recallStorage() {
  if ( localStorage.email === "true" ) {
    email.checked = true;
  } else {
    email.checked = false;
  }
  if ( localStorage.public === "true" ) {
    public.checked = true;
  } else {
    public.checked = false;
  }
  if ( localStorage.timezone ) {
    timezone.value = localStorage.timezone;
  }
};



