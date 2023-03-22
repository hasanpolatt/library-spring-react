import {useEffect, useState} from "react";
import {Button, ButtonGroup, Container, Table} from "reactstrap";
import {Link} from "react-router-dom";
import ClientNavbar from "./ClientNavbar";

const LibraryList = () => {

    const [library, setLibrary] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetch('api/books')
            .then(response => response.json())
            .then(data => {
                setLibrary(data);
                setLoading(false);
            })
    }, []);

    const remove = async (id) => {
        await fetch(`/api/book/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updateLibrary = [...library].filter(i => i.id !== id);
            setLibrary(updateLibrary);
        });
    }

    if (loading) {
        return <p>Loading...</p>
    }

    const libraryList = library.map(library => {
        const publisher = `${library.publisher || ''}`;
        return <tr key={library.id}>
            <td style={{whiteSpace: 'nowrap'}}>{library.name}</td>
            <td>{publisher}</td>
            <td>{library.events.map(event => {
                return <div key={event.id}>{new Intl.DateTimeFormat('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit'
                }).format(new Date(event.date))}: {event.title}</div>
            })}</td>
            <td>
                <ButtonGroup>
                    <Button size="sm" color="primary" tag={Link} to={"/books/" + library.id}>Edit</Button>
                    <Button size="sm" color="danger" onClick={() => remove(library.id)}>Delete</Button>
                </ButtonGroup>
            </td>
        </tr>
    });

    return (
        <div>
            <ClientNavbar />
            <Container fluid>
                <div className="float-end">
                    <Button color="success" tag={Link} to="/books/new">Add Library</Button>
                </div>
                <h3>Libraries</h3>
                    <Table className="mt-4">
                    <thead>
                    <tr>
                        <th width="20%">Publisher</th>
                        <th width="20%">Author</th>
                        <th width="20%">Book Name</th>
                        <th width="10%">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {libraryList}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}

export default LibraryList;