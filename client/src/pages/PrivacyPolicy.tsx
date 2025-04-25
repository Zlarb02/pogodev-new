import { motion } from "framer-motion";
export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background py-20">
      {" "}
      <motion.div
        className="container mx-auto px-4 max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl mt-20 md:text-4xl font-bold mb-8 font-['Poppins'] text-foreground">
          Privacy Policy
        </h1>

        <div className="prose prose-invert max-w-none space-y-6">
          <p className="text-muted-foreground">
            This website and our associated applications, including our
            multiplayer Unreal Engine game, do not directly collect or store
            personal data from users.
          </p>

          <p className="text-muted-foreground">
            However, we use third-party services such as Epic Online Services,
            which may process network and account information (such as IP
            addresses or Epic Account IDs) to enable multiplayer features like
            peer-to-peer connections. Please refer to their privacy policy for
            more information.
          </p>

          <p className="text-muted-foreground">
            We do not use tracking tools, cookies, or store any user data on our
            own servers.
          </p>

          <p className="text-muted-foreground">
            If you have any questions, feel free to contact us at{" "}
            <a
              href="mailto:contact@pogodev.com"
              className="text-accent hover:underline"
            >
              contact@pogodev.com
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
