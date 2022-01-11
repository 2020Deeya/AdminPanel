# AdminPanel

### Project Setup

Step 1: Clone the Project: 
```
git clone https://github.com/2020Deeya/AdminPanel.git
```

Step 2: 
``` 
cd AdminPanel
```

Step 3: 
```
git pull origin master
```

Step 4: Install Node on your system from [here](https://nodejs.org/en/download/)
Version Installed - v12.16.2

Step 5:
``` 
npm install
```

Step 6: Install Angular CLI through cmd:  
```
npm install -g @angular/cli
```
Version Installed - 11.0.2

Step 7: Install JSON Mock Server through cmd: 
```
npm install -g json-server
```

Step 8: Open two terminal/command Prompt

Step 9: In one terminal run command to run your application: 
```
ng serve
```

Step 10:  In another terminal run command to start the server: 
```
json-server –watch db.json
```

Note: If you found any error at the time of installation just clear the cache through cmd:
(`npm cache clean –force`)

Step 11: Click the following URL: [Local App](http://localhost:4200)

If you want to see the mock API on your browser, you can hit the below link:
[Mock API local](http://localhost:3000/posts)


### Project Overview

- #### REQUIREMENT 

This is an ecommerce application named ‘ShopBridge’ which has an interactive Admin Panel where the main user, ‘ADMIN’ can control and manage all the necessary CRUD operations - GET, POST, PUT, DELETE. The admin can add a new item to the inventory and perform modification and deletion on the selected product of the product list.

The major components and services used in this project:

- #### SIDENAV COMPONENT

The panel consists of a sideNav to the left side of the dashboard. Within the SideNav, there are mainly two items - HOME and DASHBOARD,  which let the admin navigate to the respective screens. The key features that were ensured while implementing this sideNav:
1] It should be a separate navigation component
2] It should remember its navigation state.
3] It should not overflow.

For better UI design, some dummy links are added at the bottom of the sideNav.

![Main](https://user-images.githubusercontent.com/58636958/148970553-ad58b625-36d4-4200-bd2b-6130d2665af6.JPG)

![DashboardWithoutSidebar](https://user-images.githubusercontent.com/58636958/148970883-e82d338b-b2cf-47d1-8bba-ce3319acee31.JPG)

- #### HEADER COMPONENT

The header consists of a sideNav toggle button at the top which when clicked shows and hides the sideNav. On the right side, there’s a userName which when clicked opens a dropdown for Logout feature. It can be configured as per the requirement in future.
The key feature of the header component is its reusability and provides consistency. . 

- #### HOME COMPONENT

The home component provides the default screen in the Admin panel which could also be navigated through the HOME item in the sideNav.

![home](https://user-images.githubusercontent.com/58636958/148971025-a282d981-98ed-443a-afb2-0c89facaf72f.JPG)

- #### DASHBOARD COMPONENT

The dashboard incorporates most of the functionalities as per the requirement. The content of the screen consists of a table styled with Bootstrap and CSS, which allows ADMIN to find the entire list of Products and perform operations such as EDIT/DELETE. If, in case, the API fails to fetch the data from the server, it will be shown as an error notification to the UI.

1. The ADMIN can also add a new Product through ‘Add Product’ functionality which resides at the top of the dashboard content. ‘Add Product’ button when clicked will open a dialog which contains the title as ‘Add the Product’,  FORM as main content which will be having blank fields, two action buttons - ADD and CLOSE.

The ADD action will send all the product related details to the server only after validating the form. Once it validates it, the dialog gets closed,form gets back to its original state and ADMIN can see the corresponding response on the screen itself.

a] Without Validations

![AddWithoutValidation](https://user-images.githubusercontent.com/58636958/148971108-58dbb682-1c8c-465c-bbfa-5e6ef720bb95.JPG)

b] With Validations

![AddWithValidation](https://user-images.githubusercontent.com/58636958/148971238-8b5fd8a3-09d5-4ccd-96d3-bd92ed686f7d.JPG)

2. The ADMIN can also update an existing Product through ‘EDIT’ functionality which resides in the Product List of the dashboard content. ‘EDIT’ button when clicked will open a dialog which contains the title as ‘Update the Product’,  FORM as main content which will be having populated fields based on the selected product, two action buttons - UPDATE and CLOSE.

The UPDATE action will also send and update all the product related details to the server only after validating the form. Once it validates it, the dialog gets closed and ADMIN can see the corresponding response on the screen itself.

![Update](https://user-images.githubusercontent.com/58636958/148971537-3d2fb297-a442-4b50-b5c9-2dcff6ab336b.JPG)

3. The ADMIN can also delete an existing Product through ‘DELETE’ functionality which resides in the Product List of the dashboard content. ‘DELETE’ button when clicked will immediately delete the selected Product from the list. ADMIN can see the corresponding response on the screen itself.
NOTE: Later in future, we can secure the delete functionality by considering it as a two-step process.

4. When the product list is empty, then the dashboard looks like:

![NoData](https://user-images.githubusercontent.com/58636958/148971678-64800319-65d9-478b-8a27-5ecfb1bf13d5.JPG)

5. The ADMIN can search the product through filter functionality which resides at the top of the Dashboard Content. Sorting and pagination are also incorporated. 

![search](https://user-images.githubusercontent.com/58636958/148971722-b8b81118-2f4d-4260-9d5d-df4baa501b3d.JPG)

- #### ALERT COMPONENT and ALERT SERVICE

The alert is a custom notification pop-up (snackBar) that provides a common service which can be used anywhere in the application just by injecting it to the respective component file. It shows a success/error notification based on the API response. It can be closed through the ‘Close’ button or it gets automatically closed after 6 seconds.

a] Successful Response from API

![Success](https://user-images.githubusercontent.com/58636958/148972127-7eba0c22-a5cb-49be-8f88-0dc2ba62cf65.JPG)

b] Error Response from API

![Error](https://user-images.githubusercontent.com/58636958/148972080-487de79e-bbfe-4c9d-8c63-29d2b343f0d9.JPG)


### FURTHER IMPLEMENTATION TO BE DONE:

1. Using custom pipes and directives for better presentation.
2. Ensuring Responsiveness
3. Adding Unit Tests







