import { Feed, Divider } from "semantic-ui-react";
import calculateTime from "../../utilsClient/calculateTime";

function FollowerNotification({ notification }) {
  return (
    <>
      <Feed.Event>
        <Feed.Label image={notification.user.profilePicUrl} />
        <Feed.Content>
          <Feed.Summary style={{ color: "#fff" }}>
            <>
              <Feed.User as="a" href={`/${notification.user.username}`}>
                {notification.user.name}
              </Feed.User>{" "}
              started following you.
              <Feed.Date style={{ color: "#fff" }}>
                {calculateTime(notification.date)}
              </Feed.Date>
            </>
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>
      <Divider />
    </>
  );
}

export default FollowerNotification;
