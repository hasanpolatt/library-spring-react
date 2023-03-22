import {Link, useNavigate, useParams} from "react-router-dom";
import ClientNavbar from "./ClientNavbar";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {useEffect, useState} from "react";

const LibraryEdit = () => {
    const initState = {
        name: '',
        publisher: '',
        author: '',
        translator: ''
    };

    const [library, setLibrary] = useState(initState);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id !== 'new') {
            fetch(`/api/book/${id}`)
                .then(response => response.json())
                .then(data => setLibrary(data));
        }
    }, [id, setLibrary]);

    const handleChange = (e) => {
        const { name, value } = e.target

        setLibrary({ ...library, [name]: value})
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch(`/api/book${library.id ? `/${library.id}` : ''}`, {
            method: (library.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(library)
        });
        setLibrary(initState);
        navigate('/books');
    }

    const title = <h2>{library.id ? 'Edit Library' : 'Add Library'}</h2>

    return (
        <div>
            <ClientNavbar />
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="name">Publisher</Label>
                        <Input type="text" name="name" id="name" value={library.name || ''}
                               onChange={handleChange} autoComplete="name" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="publisher">Author</Label>
                        <Input type="text" name="publisher" id="publisher" value={library.publisher || ''}
                               onChange={handleChange} autoComplete="publisher" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="author">Author</Label>
                        <Input type="text" name="author" id="author" value={library.author || ''}
                               onChange={handleChange} autoComplete="author" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="translator">Translator</Label>
                        <Input type="text" name="translator" id="translator" value={library.translator || ''}
                               onChange={handleChange} autoComplete="translator" />
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/groups">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
};

export default LibraryEdit;