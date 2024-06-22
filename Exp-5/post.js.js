// Import the necessary modules
const http = require('http');
const url = require('url');
const fs = require('fs');

// Create an HTTP server
const server = http.createServer((req, res) => {
    // Parse the URL to get the pathname
    const { pathname } = url.parse(req.url, true);

    // Serve the HTML form when the root path is accessed
    if (pathname === '/') {
        fs.readFile('post.html', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Internal Server Error');
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
        });
    } else if (pathname === '/submit' && req.method === 'POST') {
        // Handle form submission for POST method
        let formData = '';

        // Collect form data
        req.on('data', chunk => {
            formData += chunk.toString();
        });

        // Process form data when all data is received
        req.on('end', () => {
            const parsedFormData = new URLSearchParams(formData);

            // Get form values
            const name = parsedFormData.get('name');
            const empId = parsedFormData.get('empId');
            const gender = parsedFormData.get('gender');
            const branch = parsedFormData.get('branch');
            const mobile = parsedFormData.get('mobile');
            const branchAddress = parsedFormData.get('branchAddress');

            // Set the response status code to 200 (OK)
            res.statusCode = 200;
            // Set the content type of the response
            res.setHeader('Content-Type', 'text/html');
            // Send the response with the submitted data in a table format
            res.end(`
                <html>
                    <head>
                        <title>Form Submission</title>
                        <style>
                            body {
                                text-align: center; /* Center align the content within the body */
                            }
                            h1 {
                                margin-top: 30px; /* Add some space above the h1 */
                            }
                            table {
                                border-collapse: collapse;
                                width: 50%;
                                margin: 0 auto; /* Center the table horizontally */
                            }
                            th {
                                font-weight: bold; /* Make the text in table headers bold */
                                text-align: left;
                            }
                            td {
                                border: 1px solid black;
                                padding: 8px;
                                text-align: left;
                            }
                        </style>
                    </head>
                    <body>
                        <h1>Submitted Information</h1>
                        <table>
                            <tr>
                                <td>Employee Name</td>
                                <td>${name}</td>
                            </tr>
                            <tr>
                                <td>Employee ID</td>
                                <td>${empId}</td>
                            </tr>
                            <tr>
                                <td>Gender</td>
                                <td>${gender}</td>
                            </tr>
                            <tr>
                                <td>Branch</td>
                                <td>${branch}</td>
                            </tr>
                            <tr>
                                <td>Mobile Number</td>
                                <td>${mobile}</td>
                            </tr>
                            <tr>
                                <td>Branch Address</td>
                                <td>${branchAddress}</td>
                            </tr>
                        </table>
                    </body>
                </html>
            `);
        });
    } else {
        // If the request method or path is not allowed, send a 405 (Method Not Allowed) response
        res.statusCode = 405;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Method Not Allowed');
    }
});

// Set the port number for the server to listen on
const PORT = process.env.PORT || 3000;

// Start the server and listen for incoming requests
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});





