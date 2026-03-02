const BASE_URL = 'https://keneshub2-0.vercel.app';
const NUM_USERS = 10;

async function stressTest() {
  console.log(`Starting concurrent stress test for ${NUM_USERS} users on ${BASE_URL}...`);

  const promises = [];
  for (let i = 1; i <= NUM_USERS; i++) {
    const user = {
      name: `Stress Test User ${i}`,
      email: `stress_test_user_${Date.now()}_${i}@example.com`,
      password: 'Password123!'
    };

    promises.push((async () => {
      try {
        console.log(`[User ${i}] Registering...`);
        const regRes = await fetch(`${BASE_URL}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user)
        });
        
        const regData = await regRes.json();
        
        if (regRes.status === 201 || regRes.status === 200) {
          console.log(`[User ${i}] ✅ Success: Registration`);
          return true;
        } else {
          console.error(`[User ${i}] ❌ Failed: Registration - Status ${regRes.status}: ${JSON.stringify(regData)}`);
          return false;
        }
      } catch (err) {
        console.error(`[User ${i}] 💥 Error: ${err.message}`);
        return false;
      }
    })());
  }

  const results = await Promise.all(promises);
  const successCount = results.filter(r => r === true).length;
  console.log(`Stress test complete. Success rate: ${successCount}/${NUM_USERS}`);

  // Final check
  const debugRes = await fetch(`${BASE_URL}/api/debug-env`);
  const debugData = await debugRes.json();
  console.log('Final Production Status:', JSON.stringify(debugData, null, 2));
}

stressTest();
