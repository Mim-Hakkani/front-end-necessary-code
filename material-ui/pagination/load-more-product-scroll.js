/* This infinity scroll is working with graph-ql 

 package Name : react-infinite-scroll-component
 
 in Graphql :   
   
   first : Int after :String 
 
 
 */



import { useQuery } from '@apollo/client';

import { useState, useEffect, useContext } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { GET_NOTIFICATIONS } from '../apolloClient/queries/notifications/notifications';
import { GlobalContext } from '../pages/_app';

const Notifications = () => {
  const {token} =useContext(GlobalContext);

  const { data, loading, fetchMore } = useQuery(GET_NOTIFICATIONS, {
    variables: { first: 10 },
    context: {
      headers: {
        Authorization: `JWT ${token}`,
      },
    },

  });
  const [notifications, setNotifications] = useState([]);




  useEffect(() => {
    if (data) {
      setNotifications(data?.notifications.edges);
    }
  }, [data]);

  const loadMore = () => {
    fetchMore({
      variables: {
        after: data?.notifications.pageInfo.endCursor,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
        return {
          notifications: {
            ...fetchMoreResult.notifications,
            edges: [
              ...prevResult.notifications.edges,
              ...fetchMoreResult.notifications.edges,
            ],
          },
        };
      },
    });
  };

  console.log("::",notifications.length);


  if (loading) return <p>Loading...</p>;

  return (
    <InfiniteScroll
      dataLength={notifications.length}
      next={loadMore}
      hasMore={data?.notifications.pageInfo.hasNextPage}
      loader={<h4>Loading...</h4>}
    >

      {notifications.map(({ node }) => (
        <div key={node?.id}>
          <p>{node?.description}</p>
     
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default Notifications;

