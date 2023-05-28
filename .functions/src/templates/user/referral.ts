
const referralMsgTemplate = (email:string, referralName:string, userName:string, phoneNum:string ) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Referral Email</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
 @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');
  *,
  body,
  table,
  td,
  a {
    -ms-text-size-adjust: 100%; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
    font-family: 'Nunito', sans-serif;
  }
  a {
  font-weight:700;
  }

  ul {
    display: block;
    list-style-type: none;
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0px;
}

  table,
  td {
    mso-table-rspace: 0pt;
    mso-table-lspace: 0pt;
  }

  img {
    -ms-interpolation-mode: bicubic;
  }

  a[x-apple-data-detectors] {
    font-family: inherit !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    color: inherit !important;
    text-decoration: none !important;
  }
  li{
  border: 2px solid black;
  margin: 10px 0px;
  padding: 6px 12px;
  font-weight:600;
  border-radius: 6px
  }
  div[style*="margin: 16px 0;"] {
    margin: 0 !important;
  }

  body {
    width: 100% !important;
    height: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  table {
    border-collapse: collapse !important;
  }

  a {
    color: black;
  }

  img {
    height: auto;
    line-height: 100%;
    text-decoration: none;
    border: 0;
    outline: none;
  }
  </style>

</head>
<body style="background-color: #ffffff;">
  <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
   Taaskly Referral
  </div>
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td align="center" bgcolor="#ffffff">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="center" valign="top" style="padding: 14px 24px;">
              <a href="https://taaskly.xyz" target="_blank" rel="noopener noreferrer" style="display: inline-block;">
<img src="https://lh3.googleusercontent.com/_OduHVPvHwWS4RzhZuSbjgAM8Sl-aHFGM7HjQ6XL06lZWgdYT3GJjNRSoY9QVJH74KlWaOm94S0UQEubjvGkAGapWMUkkVEBMPTgsIJjxdX9RTWV0brb6aib4Z2uUoTHJ6Ka0LT9rayfBF5BNEXbQbH5s_WOm5cqzxLz_5894ZiGHGxOdiC2TFwCpCwB7Ghu1qr7FXkLbI3Jk5Vm8gg_uxQAi4RobjvEFgv0sBS5JMiPcL-Z2KL7pwyYNrf2XrfBJXWc8vbQMhQSlhxyGux03ttV2XtZLbTa7NIb3fytUrXpuXaWx93kC3XOj0FYm_YXtcGi5hr54qeJL-C6dOJcZ41Af4MzEzQKgbch04r0ROIvEYYVLFQ1RzQxsK3EeVqWk5LwZ-9u1-zcA7S7f-kKo-WO15nGm2Qyd_QID5PSMuljxOmXfO4_RhoBFUOqDksWCiNcqhLZSz2bIdLrDt8hassx8FYJQr7J5MajK9X1T-PbOVtqHaTqJkkeJq_JfbZB130hleJn8k_jEXYjOAtaPA9la_DpBXpK9XV3DVCv4rLMC6Hx2K8rAUa6J6fg5xkEJhl5ilY15eLDrgYpMzxXjfGFgs4SpAMdfG3eQyIDYq0_8nD9rrQipM8cUdNxPzmRN7iPqb5R_yAjmBMgzdABSmecH20PU-Udi7XoijhHEZQLw5WTs9uUlLqjIa8OXnihCgZTmSr9c-czP0vHxMuszLEljvAt-EvJXxzCLLh3e8Q7_hiEX4XyjDUpECUq35UnRaAEr5_5Xhiu2LdNlHoriNvcRHUrlwauXLdTbkpKVG-uf3Tim64hLuibL7qmlNjaJUQ2IHb8yCQSOPsPw3QzdNQjtCGAsBD_WwyZ0PsamAwXhd88EVRKFZ5YJ5XOGu0N--rUpjC3U3PL-kCddO03JxMdyWxVR42fxuN_iVnEQD5p8cYfMa4wHwy6zthPUFVGZXsfN_AvSn0aQe9Zs0UtLA=w320-h132-no?authuser=0" style="max-width:180px; margin: 0px auto; width:180px;"/>

              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td align="center" bgcolor="#ffffff">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;border: 2px solid #000;">
          <tr  bgcolor="#ffffff">
            <td bgcolor="#ffffff" align="left" style="padding: 32px 32px 0px 32px;  font-size: 16px; line-height: 24px;">
              <h1 style="margin: 0 0 12px; font-size: 20px; font-weight: 600; line-height: 48px;">Great news, ${referralName}!</h1>
              <p style="margin: 0;" bgcolor="#ffffff">
            We wanted to let you know that ${userName} has just signed up using your referral code on our platform. This means that you have the opportunity to earn money when they complete a task on the platform.<br> <br>
            We encourage you to reach out to ${userName} and let them know about the benefits of our platform. <br>
            - By Outsourcing task, they can simplify their life <br>
            - By completing tasks, they can earn money (You earn when they earn). <br>
            - If they have a service i.e hairstylist, Software developers or real estate agent. they can list their services and get found by users from near and far hence increasing their sales. <br>
            - If they are a vendor then they can list their Shops too and get more sales and visiblity. <br> <br>

So what are you waiting for?, click the button below and tell ${userName} all Taaskly has in store  <br> <br>

            </td>
          </tr>
     <tr>
            <td align="left" bgcolor="#ffffff">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" bgcolor="#000000" style="border-radius: 6px;">
                          <a href="https://wa.me/${phoneNum}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 16px 36px; font-family: 'Nunito', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">message ${userName}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
             <tr>

            <td align="left" bgcolor="#ffffff">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="left" bgcolor="#fff" color="#ffffff" style="border-radius: 6px; padding: 12px;">
                   <p>If you have any questions or need assistance, feel free to reach out to us. Thank you for being a part of our community.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          

          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Nunito', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #000">
              <p style="margin: 0; font-weight:500;">With love,<br> <b>Team Taaskly</b> </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>


</body>
</html>
`;


export const referralMsg = (email:string, referralName:string, userName:string, phoneNum:string) => {
  return {
      to: [{email: email, name: userName}],
      from: {email: "support@taaskly.xyz", name: "Taaskly"},
      subject: "Congratulations! Someone just signed up using your referral code",
      message_body: {
        type: "text/html",
        value: referralMsgTemplate(email, referralName, userName, phoneNum),
      },
};
};
