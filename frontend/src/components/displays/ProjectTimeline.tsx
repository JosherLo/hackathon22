import { makeStyles, Paper, Typography } from "@mui/material";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { TimelineOppositeContent } from "@mui/lab";
import { ProjectTimelineDeadline } from "../../utils/global-constants";

type ProjectTimelineProps = {
  data: {[key: string]: ProjectTimelineDeadline},
};

export const ProjectTimeline = (props: ProjectTimelineProps) => {

  const items = [];

  for (let i = 0; i < Object.entries(props.data).length; i++) {
    const [ key, val ] = Object.entries(props.data)[i];
    items.push(<TimelineItem>
      <TimelineOppositeContent color="text.secondary">{val.deadline}</TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot color={val.completed ? "success" :"secondary"}/>
        { i < Object.entries(props.data).length - 1 &&  <TimelineConnector/> }
      </TimelineSeparator>
      <TimelineContent>{key}</TimelineContent>
    </TimelineItem>);
  }


  // <ProjectTimeline data={{hi: {deadline: "wow", description:"whoo", people:[], completed: true},hi1: {deadline: "wo", description:"hoo",people:[], completed: false}}}/>

  return (
    <Timeline position={"left"}>{items}</Timeline>
  );
}
