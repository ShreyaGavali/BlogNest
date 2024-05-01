import React,{useState,useEffect} from 'react'
import axios from 'axios';
import '../css/Button.css';
import GetBlogByCategory from '../pages/GetBlogByCategory';
import ShowAllBlogs from '../pages/ShowAllBlogs';


const Buttons = () => {
  const [showType, setShowType] = useState("all");
  
  return (
    <>
    <div className='button'>
      <button onClick={() => setShowType('economy')} type="button" class="btn btn-secondary">Economy</button>

      <button onClick={() => setShowType('politics')} type="button" class="btn btn-secondary">Politics</button>

      <button onClick={() => setShowType('travel')} type="button" class="btn btn-secondary">Travel</button>
      
      <button onClick={() => setShowType('lifestyle')}  type="button" class="btn btn-secondary">Lifestyle</button>
      
      <button onClick={() => setShowType('health')}  type="button" class="btn btn-secondary">Fitness</button>
      
      <button onClick={() => setShowType('photogarphy')}  type="button" class="btn btn-secondary">Photogarphy</button>
      
      <button onClick={() => setShowType('animals')}  type="button" class="btn btn-secondary">Animals</button>
      
      <button onClick={() => setShowType('food')}  type="button" class="btn btn-secondary">Food</button>
      
    </div>
    {showType === 'all' ? <ShowAllBlogs /> : ''}
    {showType === 'travel' ? <GetBlogByCategory category={"travel"}/> : ''}
    {showType === 'lifestyle' ? <GetBlogByCategory category={"lifestyle"} /> : ''}
    {showType === 'health' ? <GetBlogByCategory category={"health"} /> : ''}
    {showType === 'photogarphy' ? <GetBlogByCategory category={"photogarphy"} /> : ''}
    {showType === 'animals' ? <GetBlogByCategory category={"animals"} /> : ''}
    {showType === 'economy' ? <GetBlogByCategory category={"economy"} /> : ''}
    {showType === 'food' ? <GetBlogByCategory category={"food"} /> : ''}
    {showType === 'economy' ? <GetBlogByCategory category={"economy"} /> : ''}
    {showType === 'politics' ? <GetBlogByCategory category={"politics"} /> : ''}
    </>
  )
}

export default Buttons
