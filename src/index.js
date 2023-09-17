import "./styles.css";

fetch('/.netlify/functions/get_data')
    .then(res => res.json())
    .then(data => console.log(data))