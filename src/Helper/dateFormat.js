const formatDate = (timestamp) => {

    const day = (date) => date.toLocaleString("en-us",
      { year: "2-digit",
        month: "2-digit",
        day: "2-digit"
      });
  
    const time = (date) => date.toLocaleString("en-us",
      { hour: "2-digit",
        minute: "2-digit"
      });
  
    const postTime = time(new Date(timestamp));
    const postDate = day(new Date(timestamp));
    const currentDate = day(new Date());
  
    return (postDate === currentDate) ? postTime : postDate;
  }
  
  export default formatDate;