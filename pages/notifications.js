import React, { useEffect, useState } from "react";
import { Feed, Segment, Divider, Container } from "semantic-ui-react";
import axios from "axios";
import baseUrl from "../utilsClient/baseUrl";
import { parseCookies } from "nookies";
import cookie from "js-cookie";
import LikeNotification from "../components/Notifications/LikeNotification";
import CommentNotification from "../components/Notifications/CommentNotification";
import FollowerNotification from "../components/Notifications/FollowerNotification";
import styles from "../styles/Feed.module.css";


function Notifications({ notifications, userFollowStats }) {

  useEffect(() => {
    const notificationRead = async () => {
      try {
        await axios.post(
          `${baseUrl}/api/notification`,
          {},
          { headers: { Authorization: cookie.get("token") } }
        );
      } catch (error) {
        console.log(error);
      }
    };
    notificationRead();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>Notifications</span>
      </div>
      <Container style={{ marginTop: "4rem", backgroundColor:"#222222" }}>
        {notifications.length > 0 ? (
          <Segment style={{backgroundColor:"#222222", color:"#fff" }}>
            <div
              style={{
                maxHeight: "90vh",
                overflow: "auto",
                height: "90vh",
                position: "relative",
                width: "100%"
              }}
            >
              <Feed size="small">
                {notifications.map(notification => (
                  <>
                    {notification.type === "newLike" && notification.post !== null && (
                      <LikeNotification
                        notification={notification}
                      />
                    )}

                    {notification.type === "newComment" && notification.post !== null && (
                      <CommentNotification
                        notification={notification}
                      />
                    )}

                    {notification.type === "newFollower" && (
                      <FollowerNotification
                        notification={notification}
                      />
                    )}
                  </>
                ))}
              </Feed>
            </div>
          </Segment>
        ) : (
          <p>None</p>
        )}
        <Divider hidden />
      </Container>
    </div>
  );
}

Notifications.getInitialProps = async ctx => {
  try {
    const { token } = parseCookies(ctx);

    const res = await axios.get(`${baseUrl}/api/notification`, {
      headers: { Authorization: token }
    });
    return { notifications: res.data };
  } catch (error) {
    return { errorLoading: true };
  }
};

export default Notifications;
