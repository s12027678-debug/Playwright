# Student Registration Form Test Plan

## Application Overview

Test plan for the DemoQA Student Registration Form at https://demoqa.com/automation-practice-form. The form collects student personal details, contact information, hobbies, optional subjects and picture upload, address, and state/city. Submission opens a modal summarizing entered values.

## Test Scenarios

### 1. Student Registration Form

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful student registration with valid data

**File:** `tests/student-registration/successful-registration.spec.ts`

**Steps:**
  1. Navigate to https://demoqa.com/automation-practice-form and wait for the Student Registration Form to load
    - expect: Page title or heading shows Practice Form
    - expect: Student Registration Form section is visible with Name, Email, Gender, Mobile, and Submit fields
  2. Enter "noor" in the First Name field and "qa" in the Last Name field
    - expect: First Name field contains "noor"
    - expect: Last Name field contains "qa"
  3. Enter "n@gmail.com" in the Email field
    - expect: Email field contains "n@gmail.com"
  4. Select the Female gender radio button
    - expect: Female radio option is selected
  5. Enter "3254563246" in the Mobile Number field
    - expect: Mobile field contains "3254563246"
  6. Open the Date of Birth picker, select year 2002, month September, and day 24
    - expect: Date of Birth field displays "24 September,2002" or equivalent formatted value (e.g. 24 September 2002)
  7. Leave Subjects empty (do not add any subject chips)
    - expect: Subjects field has no selected subjects
  8. Check the Sports checkbox under Hobbies
    - expect: Sports hobby is checked
    - expect: Reading and Music remain unchecked
  9. Leave Picture empty (do not upload a file)
    - expect: No file is selected for Picture
  10. Enter "Nablus" in the Current Address field
    - expect: Current Address field contains "Nablus"
  11. Open the State dropdown, select "Uttar Pradesh", then open the City dropdown and select "Agra"
    - expect: State displays Uttar Pradesh
    - expect: City displays Agra
    - expect: State and City fields are both populated
  12. Click the Submit button
    - expect: A confirmation modal appears
    - expect: Modal title indicates successful submission (e.g. "Thanks for submitting the form")
    - expect: Modal summary shows Student Name as "noor qa"
    - expect: Modal shows Student Email as "n@gmail.com"
    - expect: Modal shows Gender as "Female"
    - expect: Modal shows Mobile as "3254563246"
    - expect: Modal shows Date of Birth as "24 September,2002" (or site-formatted equivalent)
    - expect: Modal shows Hobbies as "Sports"
    - expect: Modal shows Address as "Nablus"
    - expect: Modal shows State and City as "Uttar Pradesh" and "Agra" (or combined as expected by the app)
    - expect: Subjects and Picture are empty or omitted in the summary as applicable

#### 1.2. Submit fails when required fields are empty

**File:** `tests/student-registration/required-fields-validation.spec.ts`

**Steps:**
  1. Navigate to https://demoqa.com/automation-practice-form with a fresh page (no stored form data)
    - expect: Student Registration Form loads with empty fields
  2. Without filling any fields, click the Submit button
    - expect: No submission confirmation modal appears
    - expect: Form remains on the registration page
    - expect: Required fields (First Name, Last Name, Gender, Mobile) show validation styling or prevent submission
  3. Fill only First Name "noor", Last Name "qa", and Email "n@gmail.com" — leave Gender, Mobile, Date of Birth, State/City, and Address empty — then click Submit
    - expect: Submission does not complete successfully
    - expect: Confirmation modal does not appear with full student summary
    - expect: User remains on the form to complete missing required fields
  4. Complete the form using valid data: First Name "noor", Last Name "qa", Email "n@gmail.com", Gender Female, Mobile "3254563246", Date of Birth 24 September 2002, Hobbies Sports, Address "Nablus", State Uttar Pradesh, City Agra (Subjects and Picture optional/empty)
    - expect: All specified fields accept the valid values without error
  5. Click Submit
    - expect: Confirmation modal appears with the entered valid data
    - expect: Proves that partial invalid submission was blocked but full valid data succeeds
