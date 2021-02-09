const Toast = ({title, text, duration, type}) => {
    let alert = document.createElement("div");
    alert.classList.add("alert");
    if(type && ['primary', 'success', 'danger'].includes(type)) alert.classList.add("alert--" + type)
    
    let alertTitle = document.createElement("div");
    alertTitle.textContent = title;
    alertTitle.classList.add("alert--title");
    
    let alertContent = document.createElement("div");
    alertContent.textContent = text;
    alertContent.classList.add("alert--content");
    
    let alertDuration = document.createElement("div");
    alertDuration.classList.add("alert--duration");
    
    alert.append(alertTitle, alertContent, alertDuration);
    document.getElementById("alerts").appendChild(alert);
    
    setTimeout(function() {
        document.getElementById("alerts").removeChild(alert)
    }, duration || 3000);
}

export default Toast