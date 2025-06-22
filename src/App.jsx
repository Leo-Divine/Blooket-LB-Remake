import "./App.css";

export function App() {
	return (
		<>
      <header className="text-center">
        <h1>Blooket Leaderboards</h1>
      </header>
      <main>
        <div className="board-row">
          <div className="board flex h-center v-center">
            <div className="board-title">
              <h2>What is This?</h2>
            </div>
            <div className="board-contents">
              <p>Blooket Leaderboards is a website that showcases leaderboards ranking the achievements of many different blooket players. You can see leaderboards from a wide variety of different categories, from gamemodes, to stats, even to the leaderboards from blooket events. This website is here to showcase the skill of any and all blooket players.</p>
            </div>
          </div>
        </div>
        <div className="board-row">
          <div className="board flex v-center">
            <div className="board-title">
              <h2>Events</h2>
            </div>
            <div className="board-contents scrollable">
              <div className="board-button-item flex v-center between" onClick={() => globalThis.location.assign("/events/coc2023")}>
                <h2>CoC 2023</h2>
                <p>8-Dec-23 - 9-Dec-23</p>
              </div>
              <div className="board-button-item flex v-center between" onClick={() => globalThis.location.assign("/events/coc2022")}>
                <h2>CoC 2022</h2>
                <p>29-Oct-22 - 30-Oct-22</p>
              </div>
              <div className="board-button-item flex v-center between" onClick={() => globalThis.location.assign("/events/lunch")}>
                <h2>L.U.N.C.H</h2>
                <p>5-Mar-22 - 5-Mar-22</p>
              </div>
              <div className="board-button-item flex v-center between" onClick={() => globalThis.location.assign("/events/pop")}>
                <h2>PoP</h2>
                <p>11-Dec-21 - 12-Dec-21</p>
              </div>
              <div className="board-button-item flex v-center between" onClick={() => globalThis.location.assign("/events/coc2021")}>
                <h2>CoC 2021</h2>
                <p>24-Oct-21 - 24-Oct-21</p>
              </div>
              <div className="board-button-item flex v-center between" onClick={() => globalThis.location.assign("/events/pac")}>
                <h2>PAC</h2>
                <p>3-Aug-21 - 7-Aug-21</p>
              </div>
              <div className="board-button-item flex v-center between" onClick={() => globalThis.location.assign("/events/coc2020")}>
                <h2>CoC 2020</h2>
                <p>26-Oct-20 - 26-Oct-20</p>
              </div>
              <div className="board-button-item flex v-center between" onClick={() => globalThis.location.assign("/events/coc2019")}>
                <h2>CoC 2019</h2>
                <p>28-Oct-19 - 8-Nov-19</p>
              </div>
            </div>
          </div>
          <div className="board flex v-center">
            <div className="board-title">
              <h2>Most Popular</h2>
            </div>
          </div>
        </div>
      </main>
    </>
	);
}

export function PrivacyPolicy() {
	return (
		<div style={{ color: "black" }}>
			<h1> Privacy Policy for Blooket Leaderboards </h1>
			<h3>
				{" "}
				This Privacy Policy describes the information collected, how it is used
				and protected, and your privacy rights.{" "}
			</h3>
			<p> Last Updated: 30 October 2024 </p>
			<br />
			<h2> Terminology </h2>
			<p> Bolded words have meanings which are described below. </p>
			<ul>
				<li>
					<b> Account: </b> refers to a/the unique user that has added their{" "}
					<b>Personal Data</b> to Blooket Leaderboards.
				</li>
				<br />
				<li>
					<b> Blooket: </b> refers to Blooket LLC, and their service/website{" "}
					<a href="blooket.com"> blooket.com</a>.
				</li>
				<br />
				<li>
					<b> Company: </b> referred to &quot;We&quot;, &quot;Us&quot;, or
					&quot;Our&quot;, and refers to Blooket Leaderboards.
				</li>
				<br />
				<li>
					<b> Personal Data: </b> any information that relates to an identified
					or identifiable individual.
				</li>
				<br />
				<li>
					<b> Service: </b> refers to the <b>Website</b>.
				</li>
				<br />
				<li>
					<b> Website: </b> refers to Blooket Leaderboards, accessed from{" "}
					<a href="https://blooket-leaderboards.pages.dev/">
						{" "}
						blooket-leaderboards.pages.dev
					</a>
					.
				</li>
				<br />
				<li>
					<b> You: </b> refers to the individual who uses the <b>Service</b>.
				</li>
			</ul>
			<br />
			<h2> Relations with Blooket LLC </h2>
			<p>
				{" "}
				<b>We</b> are a seperate service to <b>Blooket</b>. However, creating an{" "}
				<b>Account</b> using our <b>Service</b> requires you to use{" "}
				<b>Blooket</b> to make an account on their website. <b>We</b> are not
				responsible for any issues that may happen to your account or data on{" "}
				<b>Blooket</b>.
			</p>
			<br />
			<h2> Your Data </h2>
			<h3> What Data is Collected </h3>
			<p>
				{" "}
				When using <b>Our Service</b>, <b>We</b> may ask <b>You</b> to provide
				us with personal information that can be used to contact and identify
				you. Personal information that is collected may include, but not
				limmited to:
				<ul>
					<li> Email Address. </li>
					<br />
					<li> Password. </li>
					<br />
					<li>
						{" "}
						Your <b>Blooket</b> Username.{" "}
					</li>
					<br />
					<li>
						{" "}
						Your <b>Blooket</b> Statistics(ex. how many games you have played).{" "}
					</li>
					<br />
					<li>
						Your <b>Blooket</b> Account&apos;s Date of Creation.{" "}
					</li>
				</ul>
				Blooket Leaderboards will never ask you for your blooket password,
				payment information, or anything private to you. If anyone that says
				thay are associated with the <b>Service</b> or the <b>Website</b> and
				asks you for your blooket password, DO NOT GIVE THEM ANYTHING! I repeat,
				DO NOT GIVE THEM YOUR PASSWORD!!
			</p>
			<br />
			<h3> How Data is Collected </h3>
			<p>
				{" "}
				Your <b>Personal Data</b> is provided to <b>Us</b> through a form that
				can be seen on our <b>Website</b>. No data is taken without <b>Your</b>{" "}
				Consent.{" "}
			</p>
			<br />
			<h3> Why Data is Collected </h3>
			<p>
				{" "}
				Blooket Leaderboards is a service that collects data from <b>You</b> and
				others to rank users based on your
				<b>Blooket</b> Account&apos;s statistics. <b>We</b> use your data to
				rank you among others, to contact you if issues with the <b>Website</b>{" "}
				arises, or to inform <b>You</b> of changes relating to{" "}
				<b>Your Personal Data</b>.
			</p>
			<br />
			<h3> What Data is Made Public </h3>
			<p>
				Some of the data collected by <b>Us</b> is displayed on{" "}
				<b>Our Website</b>. This data includes:
				<ul>
					<li>
						{" "}
						Your <b>Blooket</b> Username.{" "}
					</li>
					<br />
					<li>
						{" "}
						Your <b>Blooket</b> Account&apos;s Statistics.{" "}
					</li>
					<br />
					<li> Your Account&apos;s Date of Creation. </li>
					<br />
					<li>
						{" "}
						Your <b>Blooket</b> Account&apos;s Date of Creation.{" "}
					</li>
				</ul>
				<br />
			</p>
			<h3> What Data is Made Private </h3>
			<p>
				{" "}
				<b>Personal Data</b> that can be used to contact or impersonate{" "}
				<b>You</b> is never shown to the public. This data may inclide but is
				not limited to:
				<ul>
					<li> Your Email Address </li>
					<br />
					<li> Your Password </li>
					<br />
					<li>
						{" "}
						Any Other Data Used to Contact <b>You</b>.{" "}
					</li>
				</ul>
			</p>
			<br />
			<h3> Security of Your Personal Data </h3>
			<p>
				{" "}
				Keeping the privacy of the <b>Accounts</b> and the users are important.
				Nothing over the internet is 100% secure, but <b>We</b> do Our best to
				keep <b>Your</b> data secure.{" "}
			</p>
			<br />
			<h2> Your Rights </h2>
			<h3> Changing Your Contact Information </h3>
			<p>
				{" "}
				<b>You</b> are easily able to change the way <b>We</b> contact you. By
				resubmitting the form on the
				<b>Website</b> with a different contact, it automatically updates the
				contact info. <b>Your</b> old contact info is never saved, and is
				deleted when you change it.
			</p>
			<br />
			<h3> Deleting Your Data </h3>
			<p>
				{" "}
				If at any point you wish to delete your <b>Personal Data</b> that is
				saved, <b>You</b> may contact <b>Us</b>
				from any of the contacts provided at the end of this document. <b>
					We
				</b>{" "}
				are obligated to delete any and all data saved under <b>Your Account</b>
				.{" "}
			</p>
			<br />
			<h2> Children&apos;s Policy </h2>
			<p>
				{" "}
				Although <b>We</b> ask if <b>You</b> are over the age of 13, children
				are capable of giving <b>Us</b> false information.
				<b>We</b> never intentionally gather the data of anyone under the age of
				13. If at any point it comes to
				<b>Our</b> attention that the <b>Personal Data</b> of someone under the
				age of 13 is in <b>Our</b> possesion, it becomes a priority to remove
				the data from our database.
			</p>
			<br />
			<h2> Contact Us </h2>
			<p>
				If you need to contact <b>Us</b> on questions about the{" "}
				<b>Service/Website</b>, matters regarding <b>Your</b> data, or any other
				matters, <b>You</b> may reach out to <b>Us</b> through the contact info
				provided below:
				<ul>
					<li>
						<b> Email: </b> blooketelite@gmail.com{" "}
					</li>
				</ul>
			</p>
		</div>
	);
}