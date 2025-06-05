async function main() {
  const LuckyDraw = await ethers.getContractFactory("LuckyDraw");
  const luckyDraw = await LuckyDraw.deploy();
  await luckyDraw.waitForDeployment();

  console.log("✅ LuckyDraw deployed to:", luckyDraw.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
