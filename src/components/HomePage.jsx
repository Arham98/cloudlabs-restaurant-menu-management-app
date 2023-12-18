import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import PageError from './errorPages/PageError';
import Loading from './loading/Loading';
import useFetch from '../hooks/useFetch';
// import CardList from './CardList';
// import NewItemForm from './NewItemForm';

export default function HomePage() {
  const [action, setAction] = useState('getAllItems');

  const queryParams = {};

  // Initializing API Call with a useFetch function
  const {
    data: itemData,
    success: callSuccess,
    loading: callLoading,
  } = useFetch(
    action,
    JSON.stringify(queryParams),
  );

  // Function to re-update GraphQL query parameters fetch list of items
  // when either a course had been added, edited, or deleted
  useEffect(() => {
    if (!callLoading && action !== 'getAllItems') {
      setAction('getAllItems');
    }
  }, [callLoading]);

  if (callLoading) {
    return (
      <Loading />
    );
  } if (!(callSuccess)) {
    if (!itemData.success) {
      console.error(`The following errors were encountered:\nError -> ${itemData.error}\n`);
      return (
        <PageError errorMessage={`The following errors were encountered:\nError -> ${itemData.error}\n`} />
      );
    }
    return (
      <PageError errorMessage="Oops! Something went wrong" />
    );
  } if (!itemData.todoList) {
    return (
      <Container className="center-container">
        <pre>
          <h1 className="text-title-color">Action Successful</h1>
        </pre>
      </Container>
    );
  }
  return (
    <Container>
      <Col className="align-items-center">
        <Row style={{ paddingTop: '10px' }}>
          <h1 className="header1-design">Todo List</h1>
        </Row>
        <Row style={{ paddingTop: '20px' }}>
          <hr style={{ color: '#ffffff' }} />
        </Row>
        <Row style={{ paddingTop: '20px' }}>
          <Button className="button" href="/menu">Preview menu</Button>
        </Row>
      </Col>
    </Container>
  );
}

// <Row style={{ paddingTop: '20px', paddingBottom: '20px' }}>
//   <CardList
//     data={itemData}
//     type="todoItem"
//     setAction={setAction}
//     setName={setName}
//     setImageLink={setImageLink}
//     setCategory={setCategory}
//     setInfo={setInfo}
//     setPrice={setPrice}
//     setId={setId}
//   />
// </Row>
