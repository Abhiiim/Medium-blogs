import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Post from "./Post";
import Filter from "./Filter";
import axios, { all } from "axios";
import styled from "styled-components";
// import posts, {getPost} from '../service/posts_service';

const ParentDiv = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
`;

const LeftDiv = styled.div`
    flex: 5;
    margin-left: 150px;
`;

const RightDiv = styled.div`
    flex: 3;
    border-left: 1px solid #e8e3e3;
    height: 100vh;
    padding: 20px;
    width: 60%;s
    // margin-right: 150px;
`;

const Line = styled.div`
    height: 1px;
    width: 90%;
    background-color: #b1a8a8;
`;

const TopPost = styled.div`
    margin-bottom: 20px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
    padding: 20px;
`;

const Topics = styled.div`
    display: flex;
    gap: 10px;
`;

const Topic = styled.div`
    background-color: #ede9e9;
    padding: 5px;
    border-radius: 5px;
`;

const Author = styled.div`
    margin-bottom: 10px;
    font-size: 14px;
`;

const Div1 = styled.div`
    border: 1px solid #e8e3e3;
    border-radius: 5px;
    padding: 10px;
`;

const url = 'http://localhost:3000/articles';

function App () {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get(url, {
            withCredentials: true
        })
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [])

    console.log(posts);

    return (
        <div className="container">
            <Navbar />
            <ParentDiv>
                <LeftDiv>
                    <Filter />
                    <div className="lists">
                        { 
                            posts.map((item, index) => {
                                return (
                                    <Post key={index} post={item} />
                                )
                            })
                        }
                    </div>
                </LeftDiv>
                <RightDiv>
                    <TopPost>
                        <h3 style={{marginTop: "0"}}>Top Posts</h3>
                        <div>
                            <Div1>
                                <div style={{fontSize: "14px"}}>Abhishek</div>
                                <h4 style={{marginTop: "10px"}}>6 Best Practices For Creating High-Quality React Apps</h4>
                            </Div1>
                        </div>
                    </TopPost>
                    {/* <Line></Line> */}
                    <TopPost>
                        <h3 style={{marginTop: "0"}}>Recommended Posts</h3>
                        <div>
                            <Div1>
                                <div style={{fontSize: "14px"}}>Abhishek</div>
                                <h4 style={{marginTop: "10px"}}>6 Best Practices For Creating High-Quality React Apps</h4>
                            </Div1>
                        </div>
                    </TopPost>
                    {/* <Line></Line> */}
                    <TopPost>
                        <h3 style={{marginTop: "0"}}>Recommended Topics</h3>
                        <Topics>
                            <Topic>React</Topic>
                            <Topic>Nodejs</Topic>
                            <Topic>Python</Topic>
                            <Topic>Ruby</Topic>
                        </Topics>
                    </TopPost>
                </RightDiv>
            </ParentDiv>
        </div>
    )
}

export default App;