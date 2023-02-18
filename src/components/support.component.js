/* eslint-disable no-lone-blocks */
import React from "react";


export default class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            subject: '',
            message: '',
            result: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeSubject = this.onChangeSubject.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const { email, subject, message } = this.state;
        const data = {
            access_key: '6c655a9e-b594-41e7-970b-7d57fcf955f2',
            email,
            subject,
            message,
        };
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(data),
        };

        this.setState({ result: 'Please wait...' });

        fetch('https://api.web3forms.com/submit', requestOptions)
            .then((response) => response.json())
            .then((data) => {

                if (data.success) {
                    this.setState({ result: data.message });
                    console.log(data)
                } else {
                    console.log(data);
                    this.setState({ result: data.message });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                this.setState({ result: 'Oops! Something went wrong.' });
            });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangeSubject(e) {
        this.setState({
            subject: e.target.value
        });
    }


    onChangeMessage(e) {
        this.setState({
            message: e.target.value
        });
    }

    render() {
        const { email, subject, message, result } = this.state;
        return (
            <div className="p-10 container mx-auto">
                <h1 className="p-5 text-center text-5xl">Contact Us</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden shadow-lg rounded-lg">
                    <div className="w-screen h-auto ">
                        <img src="https://images.pexels.com/photos/1416530/pexels-photo-1416530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="contact"></img>
                    </div>
                    <div className="block p-10 bg-white container">
                        <div className="py-5 w-fit">
                            <h2 className="text-3xl mb-4">Feel free to contact us.</h2>
                            <div className="flex items-center gap-x-2">
                                <ion-icon name="mail-outline"></ion-icon>
                                <h3>Email: support@gmail.com</h3>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <ion-icon name="location-outline"></ion-icon>
                                <h3>Address: 123 boulevard bikini bottom.</h3>
                            </div>
                        </div>
                        <form id="form" className="space-y-8" onSubmit={this.handleSubmit}>
                            {/* Validation */}
                            <input type="hidden" name="access_key" value="6c655a9e-b594-41e7-970b-7d57fcf955f2" />
                            <input type="hidden" name="subject" value={`New Submission support from Website`} />
                            <input type="checkbox" name="botcheck" id="" style={{ display: 'none' }} />
                            <input type="hidden" name="redirect" value="#" />
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                <input type="email" id="email" name="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="name@email.com"
                                    required
                                    value={email}
                                    onChange={this.onChangeEmail} />
                            </div>
                            <div>
                                <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900">Subject</label>
                                <input type="text" id="subject" name="subject" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Let us know how we can help you"
                                    required
                                    value={subject}
                                    onChange={this.onChangeSubject} />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Your message</label>
                                <textarea id="message" name="message" rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Leave a comment..."
                                    value={message}
                                    onChange={this.onChangeMessage} />
                            </div>
                            <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-700 sm:w-fit hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Send message</button>
                        </form>
                        {result && <div>{result}</div>}
                    </div>
                </div>
            </div>
        );
    }
}



