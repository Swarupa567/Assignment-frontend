import { React, useEffect, useState } from "react";
import "./Card.css";

function Card() {
  const [data, setData] = useState("");
  const [tags, setTags] = useState("");
  // useEffect((event) => {
    // var input = (document.getElementById("name-type") || document.getElementById("tags-style"));
    // input.addEventListener("keypress", function(event) {
    // if (event.key === "Enter") {
      // event.preventDefault();
      // console.log("hello")
      // document.getElementById("myBtn").click();
    // }
  // });
  // },[])

  return (
    <div className="container">
      <div className="new_card">
        <div className="input">
          <input
            className="name-type"
            type="text"
            placeholder="Type a name...."
            onClick={(e) => setData}
          />{" "}
          <br />
          <input
            className="tags-style"
            type="text"
            placeholder="Add tags"
            onclick={(e) => setTags}
          />
        </div>
      </div>
    </div>
  );
}

export default Card;
