# Admin-Portal

Admin-Portal is a users management application built with React, Material-UI and Node.js. It fetches users/employees data from a remote API and allows for operations such as searching, editing, deleting, and pagination of user records.

## Features

- **Display Users**: View a list of users fetched from a remote API.
- **Search**: Filter users by a search term.
- **Edit**: Edit user details directly in the table.
- **Delete**: Delete individual or multiple users.
- **Pagination**: Navigate through user records with pagination controls.
- **Select All**: Select or deselect all users on the current page.

## Technologies Used

- **React.js**: A JavaScript library for building user interfaces.
- **Material-UI**: React components for faster and easier web development.
- **Axios**: Promise-based HTTP client for the browser and node.js.

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:
   
   git clone https://github.com/sarim705/Admin-Portal.git
   
   cd admin-portal

3. Install the dependencies:
 
   npm install
   
4. Start the development server:
 
   npm start
   
5. Open your browser and navigate to:
 
    http://localhost:3000
   
Project Structure

src/: Main project directory.

components/UsersTable.js: Component for displaying and managing the users table.

App.js: Main application component which handles the data fetching and state management.

Usage

Fetching Data

The application fetches user data from the following API:

https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json

Editing Users

Click the "Edit" button next to a user to make their name and email fields editable.

Modify the details and click "Save" to update the user/employee information.

Deleting Users

Click the delete icon next to a user to remove them from the list.

Select multiple users using the checkboxes and delete them in bulk.

Pagination

Use the pagination buttons at the bottom of the table to navigate through different pages of users.

Contributing

Contributions are welcome! Please open an issue or submit a pull request for any bugs or feature requests.

License

This project is licensed under the MIT License - see the LICENSE file for details.

 `https://github.com/sarim705/admin-portal.git` 


