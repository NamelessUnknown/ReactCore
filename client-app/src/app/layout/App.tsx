import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import { NavBar } from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponent";
import ActivityStore from '../stores/activityStore';
import {observer} from 'mobx-react-lite'


const App = () => {
  const activityStore = useContext(ActivityStore)

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]); //empty array makes useEffect hook to run only once, without it, endless loop fetching activities will persist |OR| dependency array, inject the dependency - in this case mobx activity store 

  if(activityStore.loadingInitial) return <LoadingComponent content='Loading activities'/>;

    return (
      <Fragment>
        <NavBar />
        <Container style={{ marginTop: "7em" }}>
          <ActivityDashboard/>
        </Container>
      </Fragment>
    );
}

export default observer(App);
