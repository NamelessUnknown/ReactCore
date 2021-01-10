import React, { useContext, useEffect } from 'react'
import ActivityStore from "../../../app/stores/activityStore";
import { Button, Card, Image } from 'semantic-ui-react';
import { observer } from "mobx-react-lite";
import { Link, RouteComponentProps } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';

interface DetailParams {//match object does not have 'id', so interface has to be made and then passed to the RouteComponentProps
  id:string;
}

const ActivityDetails:React.FC<RouteComponentProps<DetailParams>> = ({match, history}) => {
  const activityStore = useContext(ActivityStore);
  const {
    activity,
    loadActivity,
    loadingInitial
  } = activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  },[loadActivity, match.params.id]);

  if(loadingInitial || !activity) return (
    <LoadingComponent content='Loading activity...'/>
  )
    return (
      <Card fluid>
        <Image
          src={`/assets/categoryImages/${activity!.category}.jpg`}
          wrapped
          ui={false}
        />
        <Card.Content>
          <Card.Header>{activity!.title}</Card.Header>
          <Card.Meta>
            <span className='date'>{activity!.date}</span>
          </Card.Meta>
          <Card.Description>{activity!.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group widths={2}>
            <Button
              as={Link} to={`/manage/${activity.id}`}
              basic
              color='blue'
              content='Edit'
            />
            <Button
              onClick={() => history.push('/activities')}
              basic
              color='grey'
              content='Cancel'
            />
          </Button.Group>
        </Card.Content>
      </Card>
    );
}

export default observer(ActivityDetails)
