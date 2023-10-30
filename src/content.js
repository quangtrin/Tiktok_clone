import { useEffect, useState, useRef } from "react";

// NOTE:
//1.Callback luôn được gọi sau component mounted
//2.Cleanup funtion luôn đc gọi trc khi component unmounted
//3.Cleanup funtion luôn đc gọi trc khi callback dc gọi(trừ lần mounted)

function Content() {
  const [title, setTitle] = useState("");
  const [posts, setPosts] = useState([]);
  const [type, setType] = useState("posts");
  const tabs = ["posts", "comments", "albums"];
  const [showGoToTop, setShowGoToTop] = useState(false);
  const [countdown, setCountdown] = useState(180);
  //1.useEffect(callback)
  //-Gọi callback mỗi khi component re-render
  //-Gọi callback sau khi component thêm element vào dom
  //   useEffect(() => {
  //     document.title = title;
  //   });
  //2.useEffect(callback,[])
  //-Chỉ gọi callback 1 lần sau component mounted
  //   useEffect(() => {
  //     fetch("https://jsonplaceholder.typicode.com/posts")
  //       .then((res) => res.json())
  //       .then((posts) => {
  //         setPosts(posts);
  //       });
  //   }, []);
  //3.useEffect(callback,[deps])
  //-callback dữ đc gọi lại mỗi khi deps thay đổi
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts);
      });
  }, [type]);

  useEffect(() => {
    const handleScroll = () => {
      setShowGoToTop(window.scrollY >= 200);
    };

    window.addEventListener("scroll", handleScroll);

    //Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevState) => prevState - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const [avatar, setAvatar] = useState();

  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview);
    };
  }, [avatar]);

  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];

    file.preview = URL.createObjectURL(file);
    setAvatar(file);
  };

  const [lessonId, setLessonId] = useState(1);

  const lessons = [
    {
      id: 1,
      name: "HTML",
    },
    {
      id: 2,
      name: "Java",
    },
    {
      id: 3,
      name: "CSS",
    },
  ];

  useEffect(() => {
    const handleComment = ({ detail }) => {
      console.log(detail);
    };

    window.addEventListener(`lesson-${lessonId}`, handleComment);

    return () => {
      window.removeEventListener(`lesson-${lessonId}`, handleComment);
    };
  }, [lessonId]);

  return (
    <div className="">
      {/* <h1>{countdown}</h1>
      {tabs.map((tab) => {
        return (
          <button
            style={
              type === tab
                ? {
                    color: "#fff",
                    backgroundColor: "#333",
                  }
                : {}
            }
            onClick={() => setType(tab)}
            key={tab}
          >
            {tab}
          </button>
        );
      })}

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
      />

      <ul>
        {posts.map((post) => {
          return <li key={post.id}>{post.title || post.name}</li>;
        })}
      </ul>

      {showGoToTop && (
        <button
          style={{
            position: "fixed",
            right: 20,
            bottom: 20,
          }}
        >
          GO TO TOP
        </button>
      )} */}

      <input type="file" onChange={handlePreviewAvatar} />
      {avatar && <img src={avatar.preview} alt="" width="80%" />}

      <ul>
        {lessons.map((lesson) => (
          <li
            key={lesson.id}
            style={{
              color: lessonId === lesson.id ? "red" : "#333",
            }}
            onClick={() => setLessonId(lesson.id)}
          >
            {lesson.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Content;
