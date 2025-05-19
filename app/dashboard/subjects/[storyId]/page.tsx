
import EditStory from '@/components/EditStory';

export type StoryType = {
  _id: string;
  heading: string;
  story: string;
  date: string;
};

type Params = Promise<{storyId: string}>

const StoryList  = async ({params}: {params: Params}) => {
  const {storyId} = await params

  const response = await fetch(`https://fourir-website-newsfeed-api.onrender.com/api/news/${storyId}`);

  const data = await response.json()

  const formatedData = data.data as StoryType
  

  // useEffect(() => {
  //   const fetchStories = async () => {
  //     try {
  //       const response = await fetch('http://localhost:5000/api/news');
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch stories');
  //       }
  //       const data = await response.json();
  //       setStories(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchStories();
  // }, []);

  return (
        <EditStory
          _id={formatedData._id}
          heading={formatedData.heading}
          story={formatedData.story}
          date={formatedData.date}
        />
  );
};

export default StoryList;
