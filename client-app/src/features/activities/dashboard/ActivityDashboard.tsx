import { Grid } from 'semantic-ui-react'
import ActivityList from './ActivityList';
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from 'react';
import ActivityStore from '../../../app/stores/activityStore'
import LoadingComponent from "../../../app/layout/LoadingComponent";


const ActivityDashboard: React.FC = () => {
    const activityStore = useContext(ActivityStore);

    useEffect(() => {
      activityStore.loadActivities();
    }, [activityStore]); //empty array makes useEffect hook to run only once, without it, endless loop fetching activities will persist |OR| dependency array, inject the dependency - in this case mobx activity store

    if (activityStore.loadingInitial)
      return <LoadingComponent content='Loading activities' />;
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Activity filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
