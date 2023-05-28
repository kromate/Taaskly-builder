const requestPaymentMsgTemplate = ( username:string, taskDesc:string, taskee_user:string ) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <title>Payment Request</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style type="text/css">
      @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');

      *,
      body,
      table,
      td,
      a {
          -ms-text-size-adjust: 100%;
          /* 1 */
          -webkit-text-size-adjust: 100%;
          /* 2 */
          font-family: 'Nunito', sans-serif;
      }

      a {
          font-weight: 700;
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

      li {
          border: 2px solid black;
          margin: 10px 0px;
          padding: 6px 12px;
          font-weight: 600;
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

      p{
      padding:0px !important;
      margin: 0px !important;
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
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center" bgcolor="#ffffff">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
            <tr>
              <td align="center" valign="top" style="padding: 14px 24px;">
                <a href="https://taaskly.xyz" target="_blank" rel="noopener noreferrer" style="display: inline-block;">
                  <img src="https://lh3.googleusercontent.com/_OduHVPvHwWS4RzhZuSbjgAM8Sl-aHFGM7HjQ6XL06lZWgdYT3GJjNRSoY9QVJH74KlWaOm94S0UQEubjvGkAGapWMUkkVEBMPTgsIJjxdX9RTWV0brb6aib4Z2uUoTHJ6Ka0LT9rayfBF5BNEXbQbH5s_WOm5cqzxLz_5894ZiGHGxOdiC2TFwCpCwB7Ghu1qr7FXkLbI3Jk5Vm8gg_uxQAi4RobjvEFgv0sBS5JMiPcL-Z2KL7pwyYNrf2XrfBJXWc8vbQMhQSlhxyGux03ttV2XtZLbTa7NIb3fytUrXpuXaWx93kC3XOj0FYm_YXtcGi5hr54qeJL-C6dOJcZ41Af4MzEzQKgbch04r0ROIvEYYVLFQ1RzQxsK3EeVqWk5LwZ-9u1-zcA7S7f-kKo-WO15nGm2Qyd_QID5PSMuljxOmXfO4_RhoBFUOqDksWCiNcqhLZSz2bIdLrDt8hassx8FYJQr7J5MajK9X1T-PbOVtqHaTqJkkeJq_JfbZB130hleJn8k_jEXYjOAtaPA9la_DpBXpK9XV3DVCv4rLMC6Hx2K8rAUa6J6fg5xkEJhl5ilY15eLDrgYpMzxXjfGFgs4SpAMdfG3eQyIDYq0_8nD9rrQipM8cUdNxPzmRN7iPqb5R_yAjmBMgzdABSmecH20PU-Udi7XoijhHEZQLw5WTs9uUlLqjIa8OXnihCgZTmSr9c-czP0vHxMuszLEljvAt-EvJXxzCLLh3e8Q7_hiEX4XyjDUpECUq35UnRaAEr5_5Xhiu2LdNlHoriNvcRHUrlwauXLdTbkpKVG-uf3Tim64hLuibL7qmlNjaJUQ2IHb8yCQSOPsPw3QzdNQjtCGAsBD_WwyZ0PsamAwXhd88EVRKFZ5YJ5XOGu0N--rUpjC3U3PL-kCddO03JxMdyWxVR42fxuN_iVnEQD5p8cYfMa4wHwy6zthPUFVGZXsfN_AvSn0aQe9Zs0UtLA=w320-h132-no?authuser=0" style="max-width:180px; margin: 0px auto; width:180px;" />
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td align="center" bgcolor="#ffffff" style="padding:0px 12px">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
            <tr>
              <td align="left" bgcolor="#ffffff">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td align="left" bgcolor="#ffffff" style="padding: 12px 0px 0px 12px;">
                      <table border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="left" bgcolor="#fff" color="#ffffff" style="border-radius: 6px; padding: 12px 0px 0px 0px;">
                            <h1 style="margin: 0 0 0px; font-size: 24px; font-weight: 700; line-height: 24px;">A taskee is requesting payment</h1>
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
                          <td align="left" bgcolor="#fff" color="#ffffff" style="border-radius: 6px; padding: 12px 0px;">
                            <p>
                              Hi ${username}, <br />
                              ${taskee_user} just completed a task that you posted and is requesting payment for it, task description below:
                            </p>
                          </td>
                        </tr>

                        <tr>
                          <td align="left" bgcolor="#000" color="#ffffff" style="border-radius: 6px; padding: 12px; color:#ffffff">${taskDesc}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td align="left" bgcolor="#ffffff" style="padding:12px 0px">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" >
                  <tr>
                    <td align="left" bgcolor="#ffffff">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td align="left" bgcolor="#ffffff" style="padding: 0px 0px 0px 10px ">
                            <table border="0" cellpadding="0" cellspacing="0">
                              <tr>
                                <td align="left" bgcolor="#000000" style="border-radius: 6px;">
                                  <a href="https://taaskly.xyz/main/home?q=myTasks" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 16px 36px; font-family: 'Nunito', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Make Payment</a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td align="left" bgcolor="#ffffff" style="padding: 10px; font-family: 'Nunito', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #000">
                <p style="margin: 0; font-weight:500;">
                  With love,<br />
                  <b>Team Taaskly</b>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>


`;


export const requestPaymentMsg = (email:string, username:string, taskDesc:string, taskee_user:string) => {
  return {
      to: [{email: email, name: username}],
      from: {email: "support@taaskly.xyz", name: "Taaskly"},
      subject: "Taskee requesting payment",
      message_body: {
        type: "text/html",
        value: requestPaymentMsgTemplate(username, taskDesc, taskee_user),
      },
};
};
