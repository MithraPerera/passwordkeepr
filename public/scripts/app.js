$(() => {
  $('#generate-password-btn').on('click', () => {
    const uppercase = $('input[name="uppercase"]:checked').val() === 'yes';
    const lowercase = $('input[name="lowercase"]:checked').val() === 'yes';
    const numbers = $('input[name="numbers"]:checked').val() === 'yes';
    const symbols = $('input[name="symbols"]:checked').val() === 'yes';
    const length = $('#length').val();

    const generatedPassword = generatePassword(uppercase, lowercase, numbers, symbols, length);
    $('#generated-password').val(generatedPassword);
  });

  $('input[name="uppercase"]').on('change', function() {
    $('input[name="uppercase"]').not(this).prop('checked', !this.checked);
  });

  $('input[name="lowercase"]').on('change', function() {
    $('input[name="lowercase"]').not(this).prop('checked', !this.checked);
  });

  $('input[name="numbers"]').on('change', function() {
    $('input[name="numbers"]').not(this).prop('checked', !this.checked);
  });

  $('input[name="symbols"]').on('change', function() {
    $('input[name="symbols"]').not(this).prop('checked', !this.checked);
  });

  $('#length').on('input', () => {
    const lengthValue = $('#length').val();
    $('#length-value').text(lengthValue);
  });

  // Function to generate a random password based on user input criteria
  function generatePassword(uppercase, lowercase, numbers, symbols, length) {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '~`! @#$%^&*()_-+={[}]|\:;"<,>.?/'
    let charset = '';

    if (uppercase) {
      charset += uppercaseChars;
    }
    if (lowercase) {
      charset += lowercaseChars;
    }
    if (numbers) {
      charset += numberChars;
    }
    if (symbols) {
      charset += symbolChars;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }
});

// Category Button Route
// $(document).ready(function() {
//   $(".categoryButton").on("click", function(event) {
//     const val = Number($(this).val());
//     let categoryStr = '';
//     switch (val) {
//       case 1:
//         categoryStr = 'finance';
//         break;
//       case 2:
//         categoryStr = 'social';
//         break;
//       case 3:
//         categoryStr = 'entertainment';
//         break;
//       case 4:
//         categoryStr = 'work';
//         break;
//       default:
//         break;
//     }
//     $.get(`/users/category/${categoryStr}`);
//   });
// });
