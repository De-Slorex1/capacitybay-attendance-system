window.addEventListener('load', (e) => {
    const form = document.getElementById('form');
    const nameInput = document.getElementById('name');
    const numberInput = document.getElementById('number');
    const cityInput = document.getElementById('city');
    const rollNoInput = document.getElementById('rollNo');
    const studentTable = document.getElementById('studentTable');
    const taskListContainer = document.querySelector('.task-list');
  
    const addRow = (name, number, city, rollNo) => {
      const row = document.createElement('tr');
  
      const nameCell = document.createElement('td');
      nameCell.textContent = name;
  
      const numberCell = document.createElement('td');
      numberCell.textContent = number;
  
      const cityCell = document.createElement('td');
      cityCell.textContent = city;
  
      const rollNoCell = document.createElement('td');
      rollNoCell.textContent = rollNo;
  
      const attendanceCell = document.createElement('td');
      const attendanceSelect = document.createElement('select');
      attendanceSelect.classList.add('attendance-select');
  
      // Attendance
      const presentOption = document.createElement('option');
      presentOption.value = 'present';
      presentOption.textContent = 'Present';
  
      const absentOption = document.createElement('option');
      absentOption.value = 'absent';
      absentOption.textContent = 'Absent';
  
      // Add event listener to select element (if you want to capture the selection)
      attendanceSelect.addEventListener('change', (e) => {
        const selectedValue = e.target.value;
        // You can perform actions based on the selected value
        console.log(selectedValue);
      });
  
      // Append options to the select element
      attendanceSelect.appendChild(presentOption);
      attendanceSelect.appendChild(absentOption);
  
      attendanceCell.appendChild(attendanceSelect);
  
      row.appendChild(nameCell);
      row.appendChild(numberCell);
      row.appendChild(cityCell);
      row.appendChild(rollNoCell);
      row.appendChild(attendanceCell);
  
      taskListContainer.appendChild(row);
    };
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const name = nameInput.value;
      const number = numberInput.value;
      const city = cityInput.value;
      const rollNo = rollNoInput.value;
  
      addRow(name, number, city, rollNo);
  
      const studentData = {
        name,
        number,
        city,
        rollNo
      };
  
      if (typeof Storage !== 'undefined') {
        const storedData = JSON.parse(localStorage.getItem('students')) || [];
        storedData.push(studentData);
        localStorage.setItem('students', JSON.stringify(storedData));
      } else {
        console.error('Local storage is not supported in this browser.');
      }
  
      nameInput.value = '';
      numberInput.value = '';
      cityInput.value = '';
      rollNoInput.value = '';
    });
  
    if (typeof Storage !== 'undefined') {
      const storedData = JSON.parse(localStorage.getItem('students')) || [];
  
      storedData.forEach(student => {
        addRow(student.name, student.number, student.city, student.rollNo);
      });
    } else {
      console.error('Local storage is not supported in this browser.');
    }


    const removeEmptyRows = () => {
      if (typeof Storage !== 'undefined') {
        let storedData = JSON.parse(localStorage.getItem('students')) || [];
        storedData = storedData.filter(student => student.rollNo.trim() !== ''); // Remove entries with empty rollNo
        localStorage.setItem('students', JSON.stringify(storedData));
      } else {
        console.error('Local storage is not supported in this browser.');
      }
    };
  
    // Call the function to remove empty rows from local storage on page load
    removeEmptyRows();







  });
  