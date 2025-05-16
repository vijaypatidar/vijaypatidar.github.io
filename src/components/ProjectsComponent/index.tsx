import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import { createTheme } from "@mui/material/styles";
import { Grid } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export interface Project {
  id: string;
  title: string;
  isActive?: boolean;
  description: string;
  featureImage?: string;
  liveUrl?: string;
  gitRepo?: string;
  moreUrl?: string;
  startTime?: string;
  endTime?: string;
}

interface ProjectComponentProps {
  project: Project;
}
const ProjectComponent = (props: ProjectComponentProps) => {
  const {
    title,
    description,
    featureImage,
    gitRepo,
    moreUrl,
    liveUrl,
    startTime,
    endTime,
  } = props.project;
  return (
    <Card>
      {featureImage && (
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={featureImage}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
          {startTime && (
            <Typography variant="body2" color="text.secondary">
              {startTime} - {endTime ?? "Present"}
            </Typography>
          )}
        </Typography>
        <Typography variant="body1" textAlign={"justify"} color="text.primary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        {moreUrl && (
          <Link href={moreUrl}>
            <Button size="small">More..</Button>
          </Link>
        )}
        {gitRepo && (
          <Link href={gitRepo} target="_blank">
            <Button>Github</Button>{" "}
          </Link>
        )}

        {liveUrl && (
          <Link href={liveUrl} target="_blank">
            <Button>View Live</Button>{" "}
          </Link>
        )}
      </CardActions>
    </Card>
  );
};

interface ProjectsComponentProps {
  projects: Project[];
}
export const ProjectsComponent = (props: ProjectsComponentProps) => {
  return (
    <Grid container spacing={1} marginTop={1} marginBottom={1}>
      {props.projects.map((project) => (
        <Grid item xs={12} sm={12} key={project.id}>
          <ProjectComponent project={project} />
        </Grid>
      ))}
    </Grid>
  );
};
