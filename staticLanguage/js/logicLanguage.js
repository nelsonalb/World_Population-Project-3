    // JavaScript function to find the top 5 most common languages
    function findTop5Languages(data) {
        const languagesCount = {};
  
        // Loop through each country in the data
        data.forEach(country => {
          const languages = country.languages;
  
          // If the country has multiple languages, loop through each language
          if (languages) {
            Object.values(languages).forEach(language => {
              // Count the occurrence of each language
              languagesCount[language] = (languagesCount[language] || 0) + 1;
            });
          }
        });
  
        // Sort the languages by occurrence count in descending order
        const sortedLanguages = Object.keys(languagesCount).sort((a, b) => {
          return languagesCount[b] - languagesCount[a];
        });
  
        // Take only the top 5 languages
        const top5Languages = sortedLanguages.slice(0, 5);
  
        // Create a new object with only the top 10 languages and their counts
        const top5LanguagesCount = {};
        top5Languages.forEach(language => {
          top5LanguagesCount[language] = languagesCount[language];
        });
  
        return top5LanguagesCount;
      }
  
      // Function to find the most common language in a given data
      function findMostCommonLanguage(data) {
        const languagesCount = {};
  
        // Loop through each country in the data
        data.forEach(country => {
          const languages = country.languages;
  
          // If the country has multiple languages, loop through each language
          if (languages) {
            Object.values(languages).forEach(language => {
              // Count the occurrence of each language
              languagesCount[language] = (languagesCount[language] || 0) + 1;
            });
          }
        });
  
        // Find the language with the highest occurrence count
        let mostCommonLanguage = '';
        let maxCount = 0;
        for (const language in languagesCount) {
          if (languagesCount[language] > maxCount) {
            mostCommonLanguage = language;
            maxCount = languagesCount[language];
          }
        }
  
        return mostCommonLanguage;
      }
  
      // Function to create and display the pie chart
      function createPieChart(region, languagesCount) {
        const chartElement = document.createElement('div');
        chartElement.setAttribute('style', 'display: inline-block; margin: 10px;');
        chartElement.innerHTML = `<h3>${region}</h3><canvas class="languageChart" width="400" height="400"></canvas>`;
        document.getElementById('charts').appendChild(chartElement);
  
        const languageChartCanvas = chartElement.querySelector('.languageChart');
        const languageChart = new Chart(languageChartCanvas, {
          type: 'pie',
          data: {
            labels: Object.keys(languagesCount),
            datasets: [{
              data: Object.values(languagesCount),
              backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)',
                'rgba(255, 0, 0, 0.8)',
                // Add more colors if needed
              ],
            }],
          },
          options: {
            legend: {
              display: true,
              position: 'center',
              fullWidth: true,
            },
          },
        });
      }
  
      // Fetch JSON data from the provided URL
      fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
          // Group countries by regions
          const regions = {};
          data.forEach(country => {
            const region = country.region;
            if (!regions[region]) {
              regions[region] = [];
            }
            regions[region].push(country);
          });
  
          // Create and display pie charts for each region
          for (const region in regions) {
            const countriesInRegion = regions[region];
            const top10LanguagesCount = findTop5Languages(countriesInRegion);
            const mostCommonLanguage = findMostCommonLanguage(countriesInRegion);
  
            createPieChart(region, top10LanguagesCount);
  
            // Display the most common language for the region
            const resultElement = document.getElementById('result');
            resultElement.innerHTML += `<p><strong>Most Common Language in ${region}:</strong> ${mostCommonLanguage}</p>`;
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
