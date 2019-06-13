# Mental Health Survey

[Code challenge](https://github.com/12traits/coding-challenges/blob/master/fed-challenge.md) for 12traits.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

---

## Problem
Visualize data about [mental health surveys](https://www.kaggle.com/osmi/mental-health-in-tech-survey/data). We need to get better insights about this data and get the highlights for countries with a high number of surveys answered.

## Solution
React app that visualizes the information in different charts.
- User can select the number of entries she/he want to display with the Select right to the `Details` button. This will affect all charts/data.

Main sections:
- Home: visualize important information such
  - Age: Stacked in one single column. Due to the different ages, I decided to group them by groups of 20 years lenght.
    - Up to 20 years
    - Up to 40 years
    - Up to 60 years
    - More than 60 years
  - Gender: Results with `f` or `female` are females, `m` or `male` are males (Not case sensitive). Any other result is `unknow gender` type.
  - Family history and Treatment columns are considered only cases with `Yes` result.
  - Filters:
    - Any column from the Home chart can be hide/show with the left list.
    - Added slider to show more/fewer countries in the chart depending on their amount of entries in the survey.
  - Table: shows all registers taking into consideration for Home and Details section.

- Details:
  - Filter by the size of the company.
  - Selector of 3 countries.
  - 5 charts displaying relevant info.
---

## Requeriments
```
npm >= 6.9.0
node >= 11.8.0
```

## Installation
```
git clone https://github.com/Osuka42g/mental-health-survey
cd mental-health-survey
npm install
```

## Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `npm run build`
Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

---
## Dependencies
- [Material-UI](https://material-ui.com/components/menus/): Widely used among react developers; contains useful components required for the app (such as the table, styling, layout)
- [Recharts](http://recharts.org/): Easy to use and lightweight charts library.

## Technical choices
- Data is fetched on app load, and persisted.
  - Due to the lack of backend, only one file of 1mb is served. So we just load once.
  - All calculations for tables are made by controller's frontend in `controller/controlleData.js`
- Using AWS S3 to serve the file.
  - Yeah.. I totally gave front-end about data manipullation. The right way is to provide a service to provide custom data on demand.
- Why not using react hooks and new cool features?
  - I haven't used them too much so I don't feel confident experimenting for this challenge.
- Why the `Comparisions` methods for accumulate instead of `reduce`?
  - I think the methods are cleaner in the intention of what they do. Also, they just run once instead of each time we want a summatory value. Anyways I think it would worth the evaluation of performance / clean code.
- Why fetch instead of axios?
  - We are just using fetching once for now. No need to add extra weight on dependencies.


## If more time / Next steps
- Unit tests are missing.
- Continious integration deployment.
- Some elements are hardcoded.
- Didn't like how the nav bar is merged with the route.
- Add endpoint to .env (or some configuration file).
- Enhance charts (Using a [map chart](https://www.amcharts.com/javascript-maps/) would be neat!).

🍻