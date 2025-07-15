<template>
  <div>
    <h2 class="text-xl mb-4">General</h2>
    <form class="space-y-4 mx-auto">
      <div>
        <label for="username">Username</label>
        <input type="text" name="username" id="username" />
      </div>
      <div>
        <label for="email">Email</label>
        <input type="email" name="email" id="email" />
      </div>
      <div>
        <label for="about-me">About Me</label>
        <textarea name="about-me" id="about-me"></textarea>
      </div>
      <div>
        <label for="gender">Gender</label>
        <label for="male">
          <input type="radio" name="gender" id="male" value="male" />
          <span>Male</span>
        </label>
        <label for="female">
          <input type="radio" name="gender" id="female" value="female" />
          <span>Female</span>
        </label>
        <label for="other">
          <input type="radio" name="gender" id="other" value="other" />
          <span>Other</span>
        </label>
      </div>
      <div>
        <label for="country">Country</label>
        <select name="country" id="country">
          <option value="indonesia">Indonesia</option>
          <option value="canada">Canada</option>
          <option value="malaysia">Malaysia</option>
        </select>
      </div>
      <button class="btn-primary" type="submit">Submit</button>
    </form>
  </div>
</template>
